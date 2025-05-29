'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase'
import { apiService } from '@/lib/api'

// Ensure API URL always has the /api prefix
const getApiUrl = () => {
  let apiUrl = process.env.NEXT_PUBLIC_API_URL
  
  if (!apiUrl) {
    return null
  }
  
  // Ensure the URL ends with /api
  if (!apiUrl.endsWith('/api')) {
    apiUrl = apiUrl.replace(/\/$/, '') + '/api'
  }
  
  return apiUrl
}

interface TestResult {
  success: boolean
  data?: any
  error?: string
  stack?: string
}

interface TestResults {
  [key: string]: TestResult
}

export default function TestPage() {
  const { user } = useAuth()
  const [results, setResults] = useState<TestResults>({})
  const [loading, setLoading] = useState<string | null>(null)

  const runTest = async (testName: string, testFn: () => Promise<any>) => {
    setLoading(testName)
    try {
      const result = await testFn()
      setResults((prev: TestResults) => ({ ...prev, [testName]: { success: true, data: result } }))
    } catch (error) {
      setResults((prev: TestResults) => ({ 
        ...prev, 
        [testName]: { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        } 
      }))
    } finally {
      setLoading(null)
    }
  }

  const testHealth = () => runTest('health', async () => {
    const apiUrl = getApiUrl()
    if (!apiUrl) throw new Error('API URL not configured')
    const response = await fetch(`${apiUrl}/health`)
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    return await response.json()
  })

  const testCoursesRaw = () => runTest('coursesRaw', async () => {
    const apiUrl = getApiUrl()
    if (!apiUrl) throw new Error('API URL not configured')
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.access_token) throw new Error('No auth token')
    
    const response = await fetch(`${apiUrl}/courses`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`${response.status} ${response.statusText}: ${errorText}`)
    }
    
    return await response.json()
  })

  const testCoursesService = () => runTest('coursesService', async () => {
    return await apiService.get('/courses')
  })

  const testSupabaseConnection = () => runTest('supabase', async () => {
    const supabase = createClient()
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) throw error
    
    return {
      hasSession: !!session,
      userId: session?.user?.id,
      email: session?.user?.email,
      tokenPresent: !!session?.access_token
    }
  })

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">API Test Page</h1>
        
        <div className="mb-8">
          <h2 className="text-xl text-white mb-4">Environment Info</h2>
          <div className="bg-gray-800 p-4 rounded-lg">
            <pre className="text-green-400 text-sm">
              {JSON.stringify({
                NODE_ENV: process.env.NODE_ENV,
                API_URL: process.env.NEXT_PUBLIC_API_URL,
                CORRECTED_API_URL: getApiUrl(),
                SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
                USER_LOGGED_IN: !!user,
                USER_EMAIL: user?.email
              }, null, 2)}
            </pre>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl text-white mb-4">Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={testHealth}
              disabled={loading === 'health'}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white p-3 rounded-lg"
            >
              {loading === 'health' ? 'Testing...' : 'Test Health Endpoint'}
            </button>

            <button
              onClick={testSupabaseConnection}
              disabled={loading === 'supabase'}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white p-3 rounded-lg"
            >
              {loading === 'supabase' ? 'Testing...' : 'Test Supabase Connection'}
            </button>

            <button
              onClick={testCoursesRaw}
              disabled={loading === 'coursesRaw' || !user}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white p-3 rounded-lg"
            >
              {loading === 'coursesRaw' ? 'Testing...' : 'Test Courses (Raw Fetch)'}
            </button>

            <button
              onClick={testCoursesService}
              disabled={loading === 'coursesService' || !user}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white p-3 rounded-lg"
            >
              {loading === 'coursesService' ? 'Testing...' : 'Test Courses (API Service)'}
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl text-white mb-4">Results</h2>
          <div className="space-y-4">
            {Object.entries(results).map(([testName, result]: [string, TestResult]) => (
              <div key={testName} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {testName} - {result.success ? '✅ Success' : '❌ Failed'}
                </h3>
                <pre className={`text-sm ${result.success ? 'text-green-400' : 'text-red-400'}`}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 