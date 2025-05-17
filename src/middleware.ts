import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = req.cookies.get('sb-auth-token');

  // If no session token and trying to access protected routes, redirect to login
  if (!session && req.nextUrl.pathname.startsWith('/courses')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // If session exists, verify it with the backend
  if (session) {
    try {
      const response = await fetch(`${API_URL}/auth/verify-session`, {
        headers: {
          'Authorization': `Bearer ${session.value}`
        }
      });

      // If session is invalid and trying to access protected routes, redirect to login
      if (!response.ok && req.nextUrl.pathname.startsWith('/courses')) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }

      // If session is valid and on login page, redirect to courses
      if (response.ok && req.nextUrl.pathname === '/auth/login') {
        return NextResponse.redirect(new URL('/courses', req.url));
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