import { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthError } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase'

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return 'Password must be at least 6 characters long'
  }
  return null
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    console.log('AuthContext: Initializing auth state...')
    
    // Check active sessions and sets the user
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('AuthContext: Initial session check:', { 
        hasSession: !!session, 
        userId: session?.user?.id,
        userEmail: session?.user?.email 
      })
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('AuthContext: Auth state changed:', { 
        event, 
        hasSession: !!session, 
        userId: session?.user?.id,
        userEmail: session?.user?.email 
      })
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log('AuthContext: Clearing session on page exit...')
      supabase.auth.signOut()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      console.log('AuthContext: Attempting to sign in with:', { email, passwordLength: password.length })
      
      const passwordError = validatePassword(password)
      if (passwordError) {
        console.log('AuthContext: Password validation failed:', passwordError)
        setError(passwordError)
        return { error: new AuthError(passwordError) }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.log('AuthContext: Sign in error:', error.message)
        
        // Handle specific error cases
        let errorMessage = error.message
        if (error.message === 'Invalid login credentials') {
          errorMessage = 'Invalid email or password'
        } else if (error.message === 'Email not confirmed') {
          errorMessage = 'Your account needs to be activated. Please check your email for a confirmation link, or contact support if you need help.'
        }
        
        setError(errorMessage)
        return { error }
      }

      console.log('AuthContext: Sign in successful:', { userId: data.user?.id })
      
      // Don't manually set user here - let onAuthStateChange handle it
      // This prevents race conditions and ensures consistency
      // setUser(data.user) // Removed this line
      
      return { error: null }
    } catch (error) {
      const authError = error as AuthError
      console.log('AuthContext: Unexpected auth error:', authError.message)
      setError(authError.message)
      return { error: authError }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      setError(null)
      console.log('AuthContext: Attempting to sign up with:', { email, passwordLength: password.length })

      const passwordError = validatePassword(password)
      if (passwordError) {
        console.log('AuthContext: Password validation failed:', passwordError)
        setError(passwordError)
        return { error: new AuthError(passwordError) }
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            email,
          }
        }
      })

      if (error) {
        console.log('AuthContext: Sign up error:', error.message)
        setError(error.message)
        return { error }
      }

      // For email confirmation flow
      if (data.user?.identities?.length === 0) {
        const message = 'This email is already registered. Please sign in instead.'
        console.log('AuthContext: Sign up failed:', message)
        setError(message)
        return { error: new AuthError(message) }
      }

      console.log('AuthContext: Sign up successful:', { userId: data.user?.id })
      
      // Don't manually set user here - let onAuthStateChange handle it
      // This ensures consistency with the auth state management
      
      return { error: null }
    } catch (error) {
      const authError = error as AuthError
      console.log('AuthContext: Unexpected auth error:', authError.message)
      setError(authError.message)
      return { error: authError }
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      console.log('AuthContext: Signing out...')
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      // Don't manually set user to null - let onAuthStateChange handle it
      console.log('AuthContext: Sign out successful')
    } catch (error) {
      const authError = error as AuthError
      console.log('AuthContext: Sign out error:', authError.message)
      setError(authError.message)
    }
  }

  // Log user state changes for debugging
  useEffect(() => {
    console.log('AuthContext: User state changed:', { 
      hasUser: !!user, 
      userId: user?.id, 
      userEmail: user?.email,
      loading 
    })
  }, [user, loading])

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 