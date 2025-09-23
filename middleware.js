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

    const adminToken = req.cookies.get('admin_token');
    console.log('Admin middleware check:', {
      pathname,
      hasAdminToken: !!adminToken,
      adminTokenValue: adminToken ? 'PRESENT' : 'MISSING',
      allCookies: Object.keys(req.cookies.getAll()),
      timestamp: new Date().toISOString()
    });

    if (!adminToken) {
      console.log('No admin token found, redirecting to login');
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }

    console.log('Admin token found, allowing access to:', pathname);
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
