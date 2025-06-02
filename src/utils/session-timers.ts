import { SessionTimers, SessionConfig } from '@/types/session';

export class TimerManager {
  private timers: SessionTimers = {
    activity: null,
    session: null,
    warning: null,
    refresh: null,
  };

  clearAll(): void {
    Object.values(this.timers).forEach(timer => {
      if (timer) clearTimeout(timer);
    });
    this.resetTimers();
  }

  clearTimer(type: keyof SessionTimers): void {
    if (this.timers[type]) {
      clearTimeout(this.timers[type]!);
      this.timers[type] = null;
    }
  }

  setActivityTimer(callback: () => void, config: SessionConfig): void {
    this.clearTimer('activity');
    this.timers.activity = setTimeout(callback, config.maxInactivityMinutes * 60 * 1000);
  }

  setSessionTimer(callback: () => void, config: SessionConfig): void {
    this.clearTimer('session');
    this.timers.session = setTimeout(callback, config.sessionTimeoutMinutes * 60 * 1000);
  }

  setWarningTimer(callback: () => void, config: SessionConfig): void {
    this.clearTimer('warning');
    const warningTime = (config.maxInactivityMinutes - config.warningBeforeTimeoutMinutes) * 60 * 1000;
    
    if (warningTime > 0) {
      this.timers.warning = setTimeout(callback, warningTime);
    }
  }

  setRefreshTimer(callback: () => void): void {
    this.clearTimer('refresh');
    this.timers.refresh = setTimeout(callback, 45 * 60 * 1000);
  }

  private resetTimers(): void {
    this.timers = {
      activity: null,
      session: null,
      warning: null,
      refresh: null,
    };
  }
} 