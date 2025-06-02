import { SessionConfig, SessionState, SessionTimeoutReason, SessionEventCallback, SessionWarningCallback } from '@/types/session';
import { createSessionConfig } from '@/utils/session-config';
import { TimerManager } from '@/utils/session-timers';
import { ActivityTracker } from '@/utils/activity-tracker';
import { CallbackManager } from '@/utils/callback-manager';
import { validateSession, createInitialSessionState, updateSessionActivity, resetSessionStart } from '@/utils/session-validator';
import { createClient } from '@/lib/supabase';

export class SessionManager {
  private config: SessionConfig;
  private state: SessionState;
  private timerManager = new TimerManager();
  private activityTracker = new ActivityTracker();
  private callbackManager = new CallbackManager();
  private supabase = createClient();

  constructor(config: Partial<SessionConfig> = {}) {
    this.config = createSessionConfig(config);
    this.state = { ...createInitialSessionState(), isActive: false };
  }

  initialize(): void {
    this.state = createInitialSessionState();
    this.startTimers();
    this.startActivityTracking();
    this.scheduleTokenRefresh();
  }

  updateConfig(newConfig: Partial<SessionConfig>): void {
    this.config = createSessionConfig({ ...this.config, ...newConfig });
    
    if (this.state.isActive) {
      this.restartTimers();
    }
  }

  recordActivity(): void {
    if (!this.state.isActive) return;

    this.state = updateSessionActivity(this.state);
    this.restartActivityTimers();
  }

  getState(): SessionState {
    return { ...this.state };
  }

  isValid(): boolean {
    return validateSession(this.state, this.config);
  }

  end(): void {
    this.state.isActive = false;
    this.cleanup();
  }

  async refresh(): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.auth.refreshSession();
      
      if (error || !data.session) {
        return false;
      }
      
      this.state = resetSessionStart(this.state);
      this.restartTimers();
      this.scheduleTokenRefresh();
      this.callbackManager.triggerRefreshCallbacks();
      return true;
    } catch {
      return false;
    }
  }

  onTimeout(callback: SessionEventCallback): () => void {
    return this.callbackManager.addTimeoutCallback(callback);
  }

  onWarning(callback: SessionWarningCallback): () => void {
    return this.callbackManager.addWarningCallback(callback);
  }

  onRefresh(callback: SessionEventCallback): () => void {
    return this.callbackManager.addRefreshCallback(callback);
  }

  private startTimers(): void {
    this.timerManager.setActivityTimer(
      () => this.handleTimeout(),
      this.config
    );

    this.timerManager.setSessionTimer(
      () => this.handleTimeout(),
      this.config
    );

    this.timerManager.setWarningTimer(
      () => this.showWarning(),
      this.config
    );
  }

  private restartTimers(): void {
    this.timerManager.clearAll();
    this.startTimers();
  }

  private restartActivityTimers(): void {
    this.timerManager.setActivityTimer(
      () => this.handleTimeout(),
      this.config
    );

    this.timerManager.setWarningTimer(
      () => this.showWarning(),
      this.config
    );
  }

  private startActivityTracking(): void {
    this.activityTracker.start(() => this.recordActivity());
  }

  private handleTimeout(): void {
    this.state.isActive = false;
    this.cleanup();
    this.callbackManager.triggerTimeoutCallbacks();
  }

  private showWarning(): void {
    if (this.state.warningShown) return;
    
    this.state.warningShown = true;
    this.callbackManager.triggerWarningCallbacks(this.config.warningBeforeTimeoutMinutes);
  }

  private scheduleTokenRefresh(): void {
    if (!this.config.refreshTokenRotationEnabled) return;

    this.timerManager.setRefreshTimer(async () => {
      const success = await this.refresh();
      
      if (success) {
        this.scheduleTokenRefresh();
      } else {
        this.handleTimeout();
      }
    });
  }

  private cleanup(): void {
    this.timerManager.clearAll();
    this.activityTracker.stop();
  }
} 