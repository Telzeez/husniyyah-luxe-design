import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './src/lib/session';

const protectedRoutes = ['/admin'];
const publicRoutes = ['/admin/login'];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Only apply to /admin routes
  if (!path.startsWith('/admin')) {
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some(route => path === route || path.startsWith(`${route}/`)) && !publicRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const session = req.cookies.get('session')?.value;
  const payload = await decrypt(session);

  if (isProtectedRoute && !payload) {
    return NextResponse.redirect(new URL('/admin/login', req.nextUrl));
  }

  if (isPublicRoute && payload) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
