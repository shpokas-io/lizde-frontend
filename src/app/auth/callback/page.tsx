'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || session) {
        router.push('/courses')
      } else {
        router.push('/login')
      }
    })
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Verifying...</h2>
        <p>Please wait while we verify your account.</p>
      </div>
    </div>
  )
} 