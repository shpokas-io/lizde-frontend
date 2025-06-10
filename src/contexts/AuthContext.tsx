import { createContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { authService } from '@/services/auth.service'
import { sessionService } from '@/services/session.service'
import { AuthContextType, AuthCredentials, RegisterCredentials, AuthResult } from '@/types/auth'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await authService.getSession()
      
      if (session?.user) {
        setUser(session.user)
        sessionService.initializeSession()
      }
      
      setLoading(false)
    }

    initializeAuth()

    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)
        if (event === 'SIGNED_IN') {
          sessionService.initializeSession()
        }
      } else {
        setUser(null)
        sessionService.endSession()
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const unsubscribeTimeout = sessionService.onSessionTimeout(() => {
      signOut()
    })

    const unsubscribeWarning = sessionService.onSessionWarning(() => {
      setError('Your session will expire soon. Please save your work.')
    })

    return () => {
      unsubscribeTimeout()
      unsubscribeWarning()
    }
  }, [])

  const signIn = async (credentials: AuthCredentials): Promise<AuthResult> => {
    setError(null)
    const result = await authService.signIn(credentials)
    
    if (result.error) {
      setError(result.error.message)
    }
    
    return result
  }

  const signUp = async (credentials: RegisterCredentials): Promise<AuthResult> => {
    setError(null)
    const result = await authService.signUp(credentials)
    
    if (result.error) {
      setError(result.error.message)
    }
    
    return result
  }

  const signOut = async (): Promise<void> => {
    setError(null)
    try {
      await authService.signOut()
    } catch (error) {
      setError('Failed to sign out')
    }
  }

  const updatePassword = async (newPassword: string): Promise<AuthResult> => {
    setError(null)
    const result = await authService.updatePassword(newPassword)
    
    if (result.error) {
      setError(result.error.message)
    }
    
    return result
  }

  const updateEmail = async (newEmail: string): Promise<AuthResult> => {
    setError(null)
    const result = await authService.updateEmail(newEmail)
    
    if (result.error) {
      setError(result.error.message)
    }
    
    return result
  }

  const deleteAccount = async (): Promise<AuthResult> => {
    setError(null)
    const result = await authService.deleteAccount()
    
    if (result.error) {
      setError(result.error.message)
    }
    
    return result
  }

  const clearError = (): void => {
    setError(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      signIn,
      signUp,
      signOut,
      updatePassword,
      updateEmail,
      deleteAccount,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  )
} 