import { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthError } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase'
import { sessionService } from '@/services/session.service'
import { apiService } from '@/lib/api'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

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
  const router = useRouter()

  useEffect(() => {
    console.log('AuthContext: Initializing auth state...')
    
    // Check active sessions and sets the user
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('AuthContext: Initial session check:', { 
        hasSession: !!session, 
        userId: session?.user?.id,
        userEmail: session?.user?.email 
      })
      
      if (session?.user) {
        setUser(session.user)
        // Initialize session management when user is authenticated
        sessionService.initializeSession()
      }
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
      
      if (session?.user) {
        setUser(session.user)
        // Initialize session management when user signs in
        if (event === 'SIGNED_IN') {
          sessionService.initializeSession()
        }
      } else {
        setUser(null)
        // End session management when user signs out
        sessionService.endSession()
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    // Set up session timeout handler
    const unsubscribeTimeout = sessionService.onSessionTimeout(() => {
      console.log('Session timeout - signing out user')
      toast.error('Session expired. Please log in again.')
      handleSignOut()
    })

    // Set up session warning handler
    const unsubscribeWarning = sessionService.onSessionWarning((minutesLeft) => {
      console.log(`Session warning: ${minutesLeft} minutes left`)
      toast.error(`Your session will expire in ${minutesLeft} minute(s). Please save your work.`)
    })

    return () => {
      unsubscribeTimeout()
      unsubscribeWarning()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      console.log('AuthContext: Attempting sign in...')
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.log('AuthContext: Sign in error:', error.message)
        setError(error.message)
        return { error }
      }

      console.log('AuthContext: Sign in successful:', { userId: data.user?.id })
      return { error: null }
    } catch (error) {
      const authError = error as AuthError
      console.log('AuthContext: Unexpected sign in error:', authError.message)
      setError(authError.message)
      return { error: authError }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      setError(null)
      console.log('AuthContext: Attempting sign up...')
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        console.log('AuthContext: Sign up error:', error.message)
        setError(error.message)
        return { error }
      }

      console.log('AuthContext: Sign up successful:', { userId: data.user?.id })
      return { error: null }
    } catch (error) {
      const authError = error as AuthError
      console.log('AuthContext: Unexpected sign up error:', authError.message)
      setError(authError.message)
      return { error: authError }
    }
  }

  const handleSignOut = async () => {
    try {
      setError(null)
      console.log('AuthContext: Signing out...')
      
      // End session management first
      sessionService.endSession()
      
      // Try to call backend logout endpoint
      try {
        await apiService.logout()
        console.log('Backend logout successful')
      } catch (error) {
        console.warn('Backend logout failed, continuing with client logout:', error)
      }
      
      // Clear any stored session data
      localStorage.clear()
      sessionStorage.clear()
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Redirect to login page
      router.push('/login')
      
      console.log('AuthContext: Sign out successful')
    } catch (error) {
      const authError = error as AuthError
      console.log('AuthContext: Sign out error:', authError.message)
      setError(authError.message)
    }
  }

  const signOut = async () => {
    await handleSignOut()
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