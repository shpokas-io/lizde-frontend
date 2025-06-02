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

export type SessionTimeoutReason = 'inactivity' | 'absolute';

export type SessionEventCallback = () => void;
export type SessionWarningCallback = (minutesLeft: number) => void;

export interface SessionCallbacks {
  timeout: SessionEventCallback[];
  warning: SessionWarningCallback[];
  refresh: SessionEventCallback[];
}

export interface SessionTimers {
  activity: NodeJS.Timeout | null;
  session: NodeJS.Timeout | null;
  warning: NodeJS.Timeout | null;
  refresh: NodeJS.Timeout | null;
} 