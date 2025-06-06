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

    const isProtectedRoute = req.nextUrl.pathname.startsWith('/courses')
    
    if (isProtectedRoute) {
      if (!session || error) {
        const redirectUrl = new URL('/login', req.url)
        redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
      }
    }

    if (req.nextUrl.pathname === '/login' && session && !error) {
      const redirectTo = req.nextUrl.searchParams.get('redirectTo')
      const redirectUrl = new URL(redirectTo && redirectTo.startsWith('/courses') ? redirectTo : '/courses', req.url)
      return NextResponse.redirect(redirectUrl)
    }

    return response
  } catch (error) {
    if (req.nextUrl.pathname.startsWith('/courses')) {
      const redirectUrl = new URL('/login', req.url)
      return NextResponse.redirect(redirectUrl)
    }
    
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