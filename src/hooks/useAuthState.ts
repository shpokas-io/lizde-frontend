import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

export function useAuthState() {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuthState must be used within an AuthProvider')
  }
  
  return context
} 