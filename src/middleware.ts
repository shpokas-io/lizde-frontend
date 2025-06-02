import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          req.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  try {
    const {
      data: { session },
      error
    } = await supabase.auth.getSession()

    console.log('Middleware: Processing request:', {
      path: req.nextUrl.pathname,
      hasSession: !!session,
      sessionValid: !!session && !error,
      error: error?.message,
      userAgent: req.headers.get('user-agent')?.slice(0, 50)
    })

    // Define protected routes - all courses routes require authentication
    const isProtectedRoute = req.nextUrl.pathname.startsWith('/courses')
    
    if (isProtectedRoute) {
      if (!session || error) {
        console.log('Middleware: Redirecting to login - no valid session for protected route:', {
          path: req.nextUrl.pathname,
          hasSession: !!session,
          error: error?.message
        })
        const redirectUrl = new URL('/login', req.url)
        // Add the original path as a query parameter for post-login redirect
        redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
      }
      
      console.log('Middleware: Allowing access to protected route:', {
        path: req.nextUrl.pathname,
        userId: session.user?.id
      })
    }

    // If user is logged in and trying to access login page, redirect to courses
    if (req.nextUrl.pathname === '/login' && session && !error) {
      console.log('Middleware: Redirecting to courses - user already logged in')
      // Check if there's a redirectTo parameter
      const redirectTo = req.nextUrl.searchParams.get('redirectTo')
      const redirectUrl = new URL(redirectTo && redirectTo.startsWith('/courses') ? redirectTo : '/courses', req.url)
      return NextResponse.redirect(redirectUrl)
    }

    return response
  } catch (error) {
    console.error('Middleware: Error processing request:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      path: req.nextUrl.pathname
    })
    
    // On error, if it's a protected route, redirect to login for safety
    if (req.nextUrl.pathname.startsWith('/courses')) {
      console.log('Middleware: Error on protected route, redirecting to login')
      const redirectUrl = new URL('/login', req.url)
      return NextResponse.redirect(redirectUrl)
    }
    
    // For non-protected routes, allow the request to proceed
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 