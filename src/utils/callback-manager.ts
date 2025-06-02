import { SessionCallbacks, SessionEventCallback, SessionWarningCallback } from '@/types/session';

export class CallbackManager {
  private callbacks: SessionCallbacks = {
    timeout: [],
    warning: [],
    refresh: [],
  };

  addTimeoutCallback(callback: SessionEventCallback): () => void {
    this.callbacks.timeout.push(callback);
    return () => this.removeCallback(this.callbacks.timeout, callback);
  }

  addWarningCallback(callback: SessionWarningCallback): () => void {
    this.callbacks.warning.push(callback);
    return () => this.removeCallback(this.callbacks.warning, callback);
  }

  addRefreshCallback(callback: SessionEventCallback): () => void {
    this.callbacks.refresh.push(callback);
    return () => this.removeCallback(this.callbacks.refresh, callback);
  }

  triggerTimeoutCallbacks(): void {
    this.callbacks.timeout.forEach(callback => callback());
  }

  triggerWarningCallbacks(minutesLeft: number): void {
    this.callbacks.warning.forEach(callback => callback(minutesLeft));
  }

  triggerRefreshCallbacks(): void {
    this.callbacks.refresh.forEach(callback => callback());
  }

  private removeCallback<T>(array: T[], callback: T): void {
    const index = array.indexOf(callback);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
} 