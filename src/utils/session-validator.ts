import { SessionState, SessionConfig } from '@/types/session';

export const validateSession = (state: SessionState, config: SessionConfig): boolean => {
  if (!state.isActive) return false;

  const now = new Date();
  const sessionAge = now.getTime() - state.sessionStart.getTime();
  const inactivityTime = now.getTime() - state.lastActivity.getTime();

  const sessionExpired = sessionAge > (config.sessionTimeoutMinutes * 60 * 1000);
  const inactivityExpired = inactivityTime > (config.maxInactivityMinutes * 60 * 1000);

  return !sessionExpired && !inactivityExpired;
};

export const createInitialSessionState = (): SessionState => ({
  isActive: true,
  lastActivity: new Date(),
  sessionStart: new Date(),
  timeUntilExpiry: 0,
  warningShown: false,
});

export const updateSessionActivity = (state: SessionState): SessionState => ({
  ...state,
  lastActivity: new Date(),
  warningShown: false,
});

export const resetSessionStart = (state: SessionState): SessionState => ({
  ...state,
  sessionStart: new Date(),
  lastActivity: new Date(),
  warningShown: false,
}); 