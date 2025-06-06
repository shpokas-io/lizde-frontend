class SessionService {
  private sessionActive = false;
  private timeoutCallbacks: (() => void)[] = [];
  private warningCallbacks: ((minutes: number) => void)[] = [];
  private sessionTimeout: NodeJS.Timeout | null = null;
  private warningTimeout: NodeJS.Timeout | null = null;

  private readonly SESSION_TIMEOUT_MINUTES = 30;
  private readonly WARNING_BEFORE_TIMEOUT_MINUTES = 5;

  initializeSession(): void {
    this.sessionActive = true;
    this.startSessionTimer();
  }

  endSession(): void {
    this.sessionActive = false;
    this.clearTimers();
  }

  recordActivity(): void {
    if (this.sessionActive) {
      this.startSessionTimer();
    }
  }

  isSessionValid(): boolean {
    return this.sessionActive;
  }

  onSessionTimeout(callback: () => void): () => void {
    this.timeoutCallbacks.push(callback);
    return () => {
      const index = this.timeoutCallbacks.indexOf(callback);
      if (index > -1) {
        this.timeoutCallbacks.splice(index, 1);
      }
    };
  }

  onSessionWarning(callback: (minutes: number) => void): () => void {
    this.warningCallbacks.push(callback);
    return () => {
      const index = this.warningCallbacks.indexOf(callback);
      if (index > -1) {
        this.warningCallbacks.splice(index, 1);
      }
    };
  }

  private startSessionTimer(): void {
    this.clearTimers();

    this.warningTimeout = setTimeout(() => {
      this.warningCallbacks.forEach((callback) =>
        callback(this.WARNING_BEFORE_TIMEOUT_MINUTES)
      );
    }, (this.SESSION_TIMEOUT_MINUTES - this.WARNING_BEFORE_TIMEOUT_MINUTES) * 60 * 1000);

    this.sessionTimeout = setTimeout(() => {
      this.sessionActive = false;
      this.timeoutCallbacks.forEach((callback) => callback());
    }, this.SESSION_TIMEOUT_MINUTES * 60 * 1000);
  }

  private clearTimers(): void {
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
      this.sessionTimeout = null;
    }
    if (this.warningTimeout) {
      clearTimeout(this.warningTimeout);
      this.warningTimeout = null;
    }
  }
}

export const sessionService = new SessionService();
