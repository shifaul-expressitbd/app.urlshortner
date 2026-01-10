import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  const { pathname } = request.nextUrl

  // Protected Routes Pattern
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/folders') || pathname.startsWith('/settings') || pathname.startsWith('/links') || pathname.startsWith('/analytics')) {
    if (!token) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('callbackUrl', encodeURI(request.url))
      return NextResponse.redirect(url)
    }
  }

  // Auth Routes (Redirect to dashboard if already logged in)
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
      if (token) {
         return NextResponse.redirect(new URL('/dashboard', request.url))
      }
  }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/admin/:path*', 
    '/folders/:path*',
    '/settings/:path*',
    '/links/:path*',
    '/analytics/:path*',
    '/login',
    '/register'
  ],
}
