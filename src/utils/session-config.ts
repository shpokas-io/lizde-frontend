import { SessionConfig } from '@/types/session';

export const DEFAULT_SESSION_CONFIG: SessionConfig = {
  sessionTimeoutMinutes: 5,
  refreshTokenRotationEnabled: false,
  maxInactivityMinutes: 5,
  warningBeforeTimeoutMinutes: 1,
};

export const createSessionConfig = (overrides: Partial<SessionConfig> = {}): SessionConfig => ({
  ...DEFAULT_SESSION_CONFIG,
  ...overrides,
});

export const validateSessionConfig = (config: SessionConfig): boolean => {
  return (
    config.sessionTimeoutMinutes > 0 &&
    config.maxInactivityMinutes > 0 &&
    config.warningBeforeTimeoutMinutes >= 0 &&
    config.warningBeforeTimeoutMinutes < config.maxInactivityMinutes
  );
}; 