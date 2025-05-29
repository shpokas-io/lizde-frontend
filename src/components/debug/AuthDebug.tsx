'use client'

import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function AuthDebug() {
  const { user, loading } = useAuth()
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [envInfo, setEnvInfo] = useState<any>(null)
  const [healthTest, setHealthTest] = useState<any>(null)
  const [coursesTest, setCoursesTest] = useState<any>(null)

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

    // Test health endpoint (no auth required)
    const testHealth = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) {
          setHealthTest({ error: 'API_URL not configured' })
          return
        }

        const response = await fetch(`${apiUrl}/health`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        const data = await response.json()
        setHealthTest({
          status: response.status,
          statusText: response.statusText,
          url: `${apiUrl}/health`,
          data: data
        })
      } catch (error) {
        setHealthTest({
          error: error instanceof Error ? error.message : 'Unknown error',
          url: process.env.NEXT_PUBLIC_API_URL
        })
      }
    }

    // Test courses endpoint (auth required)
    const testCourses = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) {
          setCoursesTest({ error: 'API_URL not configured' })
          return
        }

        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.access_token) {
          setCoursesTest({ error: 'No auth token available' })
          return
        }

        const response = await fetch(`${apiUrl}/courses`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setCoursesTest({
            status: response.status,
            statusText: response.statusText,
            url: `${apiUrl}/courses`,
            dataLength: Array.isArray(data) ? data.length : 'Not array'
          })
        } else {
          const errorText = await response.text()
          setCoursesTest({
            status: response.status,
            statusText: response.statusText,
            url: `${apiUrl}/courses`,
            error: errorText
          })
        }
      } catch (error) {
        setCoursesTest({
          error: error instanceof Error ? error.message : 'Unknown error',
          url: process.env.NEXT_PUBLIC_API_URL
        })
      }
    }

    // Always test health
    testHealth()

    // Test courses only if user is logged in
    if (user) {
      testCourses()
    }
  }, [user])

  // Only show in development or when explicitly enabled
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_ENABLE_DEBUG) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-md max-h-96 overflow-auto z-50">
      <h3 className="font-bold mb-2">🐛 Debug Info</h3>
      
      <div className="mb-2">
        <strong>Auth Status:</strong>
        <div>Loading: {loading ? 'Yes' : 'No'}</div>
        <div>User: {user ? user.email : 'None'}</div>
      </div>

      <div className="mb-2">
        <strong>Environment:</strong>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(envInfo, null, 2)}
        </pre>
      </div>

      <div className="mb-2">
        <strong>Health Test:</strong>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(healthTest, null, 2)}
        </pre>
      </div>

      <div className="mb-2">
        <strong>Courses Test:</strong>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(coursesTest, null, 2)}
        </pre>
      </div>

      <div className="mb-2">
        <strong>Session:</strong>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(sessionInfo, null, 2)}
        </pre>
      </div>
    </div>
  )
} 