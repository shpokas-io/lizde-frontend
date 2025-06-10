import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { AuthContext } from '@/contexts/AuthContext'
import { AuthCredentials, RegisterCredentials } from '@/types/auth'

export function useAuth() {
  const context = useContext(AuthContext)
  const router = useRouter()

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  const signIn = async (credentials: AuthCredentials) => {
    const result = await context.signIn(credentials)
    
    if (result.error) {
      toast.error(result.error.message)
    } else {
      toast.success('Signed in successfully')
      router.push('/dashboard')
    }
    
    return result
  }

  const signUp = async (credentials: RegisterCredentials) => {
    const result = await context.signUp(credentials)
    
    if (result.error) {
      toast.error(result.error.message)
    } else {
      toast.success('Paskyra sukurta sėkmingai! Dabar prisijunkite.')
    }
    
    return result
  }

  const signOut = async () => {
    try {
      await context.signOut()
      toast.success('Signed out successfully')
      router.push('/login')
    } catch {
      toast.error('Failed to sign out')
    }
  }

  const updatePassword = async (newPassword: string) => {
    const result = await context.updatePassword(newPassword)
    
    if (result.error) {
      toast.error(result.error.message)
    } else {
      toast.success('Slaptažodis sėkmingai pakeistas')
    }
    
    return result
  }

  const updateEmail = async (newEmail: string) => {
    const result = await context.updateEmail(newEmail)
    
    if (result.error) {
      toast.error(result.error.message)
    } else {
      toast.success('El. pašto keitimo užklausa išsiųsta')
    }
    
    return result
  }

  const deleteAccount = async () => {
    const result = await context.deleteAccount()
    
    if (result.error) {
      if (result.error.name === "NotImplementedError") {
        toast.error("Paskyros trynimas šiuo metu negalimas. Susisiekite su administracija.")
      } else {
        toast.error(result.error.message)
      }
    } else {
      toast.success('Paskyra sėkmingai ištrinta')
      router.push('/login')
    }
    
    return result
  }

  return {
    ...context,
    signIn,
    signUp,
    signOut,
    updatePassword,
    updateEmail,
    deleteAccount,
  }
} 