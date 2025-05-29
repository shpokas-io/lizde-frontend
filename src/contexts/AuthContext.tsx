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
    // Check active sessions and sets the user
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      console.log('Attempting to sign in with:', { email, passwordLength: password.length })
      
      const passwordError = validatePassword(password)
      if (passwordError) {
        console.log('Password validation failed:', passwordError)
        setError(passwordError)
        return { error: new AuthError(passwordError) }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.log('Sign in error:', error.message)
        
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

      console.log('Sign in successful:', { userId: data.user?.id })
      setUser(data.user)
      return { error: null }
    } catch (error) {
      const authError = error as AuthError
      console.log('Unexpected auth error:', authError.message)
      setError(authError.message)
      return { error: authError }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      setError(null)
      console.log('Attempting to sign up with:', { email, passwordLength: password.length })

      const passwordError = validatePassword(password)
      if (passwordError) {
        console.log('Password validation failed:', passwordError)
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
        console.log('Sign up error:', error.message)
        setError(error.message)
        return { error }
      }

      // For email confirmation flow
      if (data.user?.identities?.length === 0) {
        const message = 'This email is already registered. Please sign in instead.'
        console.log('Sign up failed:', message)
        setError(message)
        return { error: new AuthError(message) }
      }

      console.log('Sign up successful:', { userId: data.user?.id })
      
      // If user is immediately confirmed (no email confirmation required), set the user
      if (data.user && !data.user.email_confirmed_at) {
        // User needs email confirmation, but since you don't want email confirmation,
        // we should configure Supabase to auto-confirm users
        console.log('User created but needs email confirmation')
      } else if (data.user) {
        // User is immediately available
        setUser(data.user)
      }
      
      return { error: null }
    } catch (error) {
      const authError = error as AuthError
      console.log('Unexpected auth error:', authError.message)
      setError(authError.message)
      return { error: authError }
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
    } catch (error) {
      const authError = error as AuthError
      setError(authError.message)
    }
  }

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