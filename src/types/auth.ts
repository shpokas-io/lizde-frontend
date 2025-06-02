import { User, AuthError } from '@supabase/supabase-js'

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthResult {
  error: AuthError | null
}

export interface AuthContextType extends AuthState {
  signIn: (credentials: AuthCredentials) => Promise<AuthResult>
  signUp: (credentials: AuthCredentials) => Promise<AuthResult>
  signOut: () => Promise<void>
  clearError: () => void
}

export type AuthEvent = 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED' | 'USER_UPDATED'

export interface AuthEventHandler {
  (event: AuthEvent, user: User | null): void
} 