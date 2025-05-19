import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function middleware(req: NextRequest) {
  console.log('Middleware called for path:', req.nextUrl.pathname);
  const res = NextResponse.next();
  
  // Check for Supabase session cookie
  const supabaseSession = req.cookies.get('sb-auth-token');
  console.log('Supabase session exists:', !!supabaseSession);

  // If no session token and trying to access protected routes, redirect to login
  if (!supabaseSession && req.nextUrl.pathname.startsWith('/courses')) {
    console.log('No session found, redirecting to login');
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // If session exists, verify it with Supabase
  if (supabaseSession) {
    try {
      console.log('Verifying session...');
      const { data: { user }, error } = await supabase.auth.getUser(supabaseSession.value);
      console.log('Session verification result:', { user: !!user, error: !!error });
      
      // If session is invalid and trying to access protected routes, redirect to login
      if (error || !user) {
        console.log('Invalid session, redirecting to login');
        if (req.nextUrl.pathname.startsWith('/courses')) {
          return NextResponse.redirect(new URL('/auth/login', req.url));
        }
      } else {
        // If session is valid and on login page, redirect to courses
        if (req.nextUrl.pathname === '/auth/login') {
          console.log('Valid session, redirecting to courses');
          return NextResponse.redirect(new URL('/courses', req.url));
        }
      }
    } catch (error) {
      console.error('Error verifying session:', error);
      // On error, if trying to access protected routes, redirect to login
      if (req.nextUrl.pathname.startsWith('/courses')) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }
    }
  }

  return res;
}

export const config = {
  matcher: ['/courses/:path*', '/auth/login'],
}; 