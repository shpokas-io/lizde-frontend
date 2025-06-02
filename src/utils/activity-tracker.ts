export class ActivityTracker {
  private static readonly TRACKED_EVENTS = [
    'mousedown',
    'mousemove', 
    'keypress',
    'scroll',
    'touchstart',
    'click'
  ];

  private activityCallback: (() => void) | null = null;
  private isListening = false;

  start(callback: () => void): void {
    if (this.isListening) {
      this.stop();
    }

    this.activityCallback = callback;
    this.isListening = true;

    ActivityTracker.TRACKED_EVENTS.forEach(event => {
      document.addEventListener(event, this.handleActivity, true);
    });
  }

  stop(): void {
    if (!this.isListening) return;

    ActivityTracker.TRACKED_EVENTS.forEach(event => {
      document.removeEventListener(event, this.handleActivity, true);
    });

    this.activityCallback = null;
    this.isListening = false;
  }

  private handleActivity = (): void => {
    this.activityCallback?.();
  };
} 