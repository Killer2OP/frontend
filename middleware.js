import { NextResponse } from 'next/server';

// Paths that do not require user auth
const PUBLIC_PATHS = [
  '/register',
  '/login',
  '/admin',
  '/about',
  '/contact',
  '/services',
  '/sindhisociety',
  '/ourteam',
  '/',
  '/favicon.ico'
];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow Next.js internals and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/public') ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  // Admin auth: protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
      return NextResponse.next();
    }

    // Check for admin token in Authorization header or cookie
    const authHeader = req.headers.get('authorization');
    const adminToken = req.cookies.get('admin_token') || (authHeader && authHeader.replace('Bearer ', ''));

    console.log('Admin middleware check:', {
      pathname,
      hasAuthHeader: !!authHeader,
      hasCookieToken: !!req.cookies.get('admin_token'),
      authHeaderValue: authHeader ? 'PRESENT' : 'MISSING',
      allCookies: Object.keys(req.cookies.getAll())
    });

    if (!adminToken) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // Allow public paths
  if (PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next();
  }

  // Check client-side auth flag cookie (set after user login)
  const clientAuth = req.cookies.get('client_auth');
  if (!clientAuth) {
    const url = req.nextUrl.clone();
    url.pathname = '/register';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Only apply auth checks to dashboard (leave public site unguarded)
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
