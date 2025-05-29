'use client'

import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function AuthDebug() {
  const { user, loading } = useAuth()
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [envInfo, setEnvInfo] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()
    
    // Get session info
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      setSessionInfo({
        session: session ? {
          user: session.user?.id,
          email: session.user?.email,
          expires_at: session.expires_at,
          access_token: session.access_token ? 'Present' : 'Missing'
        } : null,
        error: error?.message
      })
    })

    // Get environment info
    setEnvInfo({
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      NODE_ENV: process.env.NODE_ENV,
      currentOrigin: typeof window !== 'undefined' ? window.location.origin : 'SSR'
    })
  }, [])

  // Only show in development or when explicitly enabled
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_ENABLE_DEBUG) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-md z-50">
      <h3 className="font-bold mb-2">🐛 Auth Debug Info</h3>
      
      <div className="mb-2">
        <strong>Auth Context:</strong>
        <div>User: {user ? `${user.email} (${user.id})` : 'null'}</div>
        <div>Loading: {loading.toString()}</div>
      </div>

      <div className="mb-2">
        <strong>Session:</strong>
        <pre className="text-xs overflow-auto max-h-20">
          {JSON.stringify(sessionInfo, null, 2)}
        </pre>
      </div>

      <div className="mb-2">
        <strong>Environment:</strong>
        <pre className="text-xs overflow-auto max-h-20">
          {JSON.stringify(envInfo, null, 2)}
        </pre>
      </div>

      <div className="text-xs text-gray-400">
        Current URL: {typeof window !== 'undefined' ? window.location.href : 'SSR'}
      </div>
    </div>
  )
} 