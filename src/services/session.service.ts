import { SessionManager } from './session-manager';
import { SessionConfig, SessionState, SessionEventCallback, SessionWarningCallback } from '@/types/session';

class SessionService {
  private sessionManager = new SessionManager();

  initializeSession(): void {
    this.sessionManager.initialize();
  }

  updateConfig(newConfig: Partial<SessionConfig>): void {
    this.sessionManager.updateConfig(newConfig);
  }

  recordActivity(): void {
    this.sessionManager.recordActivity();
  }

  getSessionState(): SessionState {
    return this.sessionManager.getState();
  }

  isSessionValid(): boolean {
    return this.sessionManager.isValid();
  }

  endSession(): void {
    this.sessionManager.end();
  }

  async refreshSession(): Promise<boolean> {
    return this.sessionManager.refresh();
  }

  onSessionTimeout(callback: SessionEventCallback): () => void {
    return this.sessionManager.onTimeout(callback);
  }

  onSessionWarning(callback: SessionWarningCallback): () => void {
    return this.sessionManager.onWarning(callback);
  }

  onSessionRefresh(callback: SessionEventCallback): () => void {
    return this.sessionManager.onRefresh(callback);
  }
}

export const sessionService = new SessionService(); 