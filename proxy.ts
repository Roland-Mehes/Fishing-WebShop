import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Admin
  if (pathname.startsWith('/admin')) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (session.user.role !== 'super_admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // LOGIN & SIGNUP PROTECTION

  if (pathname === '/login' || pathname === '/signup') {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/signup'],
};
