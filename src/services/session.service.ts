import { createClient } from '@/lib/supabase';

export interface SessionConfig {
  sessionTimeoutMinutes: number;
  refreshTokenRotationEnabled: boolean;
  maxInactivityMinutes: number;
  warningBeforeTimeoutMinutes: number;
}

export interface SessionState {
  isActive: boolean;
  lastActivity: Date;
  sessionStart: Date;
  timeUntilExpiry: number;
  warningShown: boolean;
}

class SessionService {
  private config: SessionConfig = {
    sessionTimeoutMinutes: 5, // 5 minutes total session time
    refreshTokenRotationEnabled: false, // Disable token refresh
    maxInactivityMinutes: 5, // 5 minutes of inactivity
    warningBeforeTimeoutMinutes: 1, // Show warning 1 minute before timeout
  };

  private sessionState: SessionState = {
    isActive: false,
    lastActivity: new Date(),
    sessionStart: new Date(),
    timeUntilExpiry: 0,
    warningShown: false,
  };

  private activityTimer: NodeJS.Timeout | null = null;
  private sessionTimer: NodeJS.Timeout | null = null;
  private warningTimer: NodeJS.Timeout | null = null;
  private refreshTimer: NodeJS.Timeout | null = null;

  private sessionTimeoutCallbacks: Array<() => void> = [];
  private sessionWarningCallbacks: Array<(minutesLeft: number) => void> = [];
  private sessionRefreshCallbacks: Array<() => void> = [];

  private supabase = createClient();

  /**
   * Initialize session management
   */
  public initializeSession(): void {
    this.sessionState = {
      isActive: true,
      lastActivity: new Date(),
      sessionStart: new Date(),
      timeUntilExpiry: this.config.sessionTimeoutMinutes * 60 * 1000,
      warningShown: false,
    };

    this.startSessionTimers();
    this.setupActivityListeners();
    this.scheduleTokenRefresh();
  }

  /**
   * Update session configuration
   */
  public updateConfig(newConfig: Partial<SessionConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    if (this.sessionState.isActive) {
      this.restartTimers();
    }
  }

  /**
   * Record user activity to reset inactivity timer
   */
  public recordActivity(): void {
    if (!this.sessionState.isActive) return;

    this.sessionState.lastActivity = new Date();
    this.sessionState.warningShown = false;
    
    this.restartActivityTimer();
  }

  /**
   * Get current session state
   */
  public getSessionState(): SessionState {
    return { ...this.sessionState };
  }

  /**
   * Check if session is still valid
   */
  public isSessionValid(): boolean {
    if (!this.sessionState.isActive) return false;

    const now = new Date();
    const sessionAge = now.getTime() - this.sessionState.sessionStart.getTime();
    const inactivityTime = now.getTime() - this.sessionState.lastActivity.getTime();

    const sessionExpired = sessionAge > (this.config.sessionTimeoutMinutes * 60 * 1000);
    const inactivityExpired = inactivityTime > (this.config.maxInactivityMinutes * 60 * 1000);

    return !sessionExpired && !inactivityExpired;
  }

  /**
   * Manually end the session
   */
  public endSession(): void {
    this.sessionState.isActive = false;
    this.clearAllTimers();
    this.removeActivityListeners();
  }

  /**
   * Refresh the current session
   */
  public async refreshSession(): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.auth.refreshSession();
      
      if (error) {
        throw error;
      }

      if (data.session) {
        // Reset session timers on successful refresh
        this.sessionState.sessionStart = new Date();
        this.sessionState.lastActivity = new Date();
        this.sessionState.warningShown = false;
        
        this.restartTimers();
        this.scheduleTokenRefresh();
        
        // Notify callbacks
        this.sessionRefreshCallbacks.forEach(callback => callback());
        
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Register callback for session timeout
   */
  public onSessionTimeout(callback: () => void): () => void {
    this.sessionTimeoutCallbacks.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.sessionTimeoutCallbacks.indexOf(callback);
      if (index > -1) {
        this.sessionTimeoutCallbacks.splice(index, 1);
      }
    };
  }

  /**
   * Register callback for session warning
   */
  public onSessionWarning(callback: (minutesLeft: number) => void): () => void {
    this.sessionWarningCallbacks.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.sessionWarningCallbacks.indexOf(callback);
      if (index > -1) {
        this.sessionWarningCallbacks.splice(index, 1);
      }
    };
  }

  /**
   * Register callback for session refresh
   */
  public onSessionRefresh(callback: () => void): () => void {
    this.sessionRefreshCallbacks.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.sessionRefreshCallbacks.indexOf(callback);
      if (index > -1) {
        this.sessionRefreshCallbacks.splice(index, 1);
      }
    };
  }

  /**
   * Start all session timers
   */
  private startSessionTimers(): void {
    this.startActivityTimer();
    this.startSessionTimer();
    this.startWarningTimer();
  }

  /**
   * Start activity timer for inactivity detection
   */
  private startActivityTimer(): void {
    if (this.activityTimer) {
      clearTimeout(this.activityTimer);
    }

    this.activityTimer = setTimeout(() => {
      this.handleSessionTimeout('inactivity');
    }, this.config.maxInactivityMinutes * 60 * 1000);
  }

  /**
   * Start session timer for absolute timeout
   */
  private startSessionTimer(): void {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
    }

    this.sessionTimer = setTimeout(() => {
      this.handleSessionTimeout('absolute');
    }, this.config.sessionTimeoutMinutes * 60 * 1000);
  }

  /**
   * Start warning timer
   */
  private startWarningTimer(): void {
    if (this.warningTimer) {
      clearTimeout(this.warningTimer);
    }

    const warningTime = (this.config.maxInactivityMinutes - this.config.warningBeforeTimeoutMinutes) * 60 * 1000;
    
    if (warningTime > 0) {
      this.warningTimer = setTimeout(() => {
        this.showSessionWarning();
      }, warningTime);
    }
  }

  /**
   * Restart activity timer
   */
  private restartActivityTimer(): void {
    this.startActivityTimer();
    this.startWarningTimer();
  }

  /**
   * Restart all timers
   */
  private restartTimers(): void {
    this.clearAllTimers();
    this.startSessionTimers();
  }

  /**
   * Clear all timers
   */
  private clearAllTimers(): void {
    if (this.activityTimer) {
      clearTimeout(this.activityTimer);
      this.activityTimer = null;
    }
    
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
      this.sessionTimer = null;
    }
    
    if (this.warningTimer) {
      clearTimeout(this.warningTimer);
      this.warningTimer = null;
    }
    
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  /**
   * Handle session timeout
   */
  private handleSessionTimeout(reason: 'inactivity' | 'absolute'): void {
    this.sessionState.isActive = false;
    this.clearAllTimers();
    this.removeActivityListeners();
    
    // Notify all timeout callbacks
    this.sessionTimeoutCallbacks.forEach(callback => callback());
  }

  /**
   * Show session warning
   */
  private showSessionWarning(): void {
    if (this.sessionState.warningShown) return;
    
    this.sessionState.warningShown = true;
    const minutesLeft = this.config.warningBeforeTimeoutMinutes;
    
    // Notify all warning callbacks
    this.sessionWarningCallbacks.forEach(callback => callback(minutesLeft));
  }

  /**
   * Schedule automatic token refresh
   */
  private scheduleTokenRefresh(): void {
    if (!this.config.refreshTokenRotationEnabled) return;

    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    // Refresh token every 45 minutes (before the 1-hour expiry)
    this.refreshTimer = setTimeout(async () => {
      const success = await this.refreshSession();
      
      if (success) {
        // Schedule next refresh
        this.scheduleTokenRefresh();
      } else {
        // If refresh fails, end session
        this.handleSessionTimeout('absolute');
      }
    }, 45 * 60 * 1000); // 45 minutes
  }

  /**
   * Setup activity listeners
   */
  private setupActivityListeners(): void {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, this.handleActivity, true);
    });
  }

  /**
   * Remove activity listeners
   */
  private removeActivityListeners(): void {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.removeEventListener(event, this.handleActivity, true);
    });
  }

  /**
   * Handle activity event
   */
  private handleActivity = (): void => {
    this.recordActivity();
  };
}

export const sessionService = new SessionService(); 