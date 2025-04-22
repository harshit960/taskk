import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Create an initial response that we'll modify
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Log the current cookies for debugging
  // console.log('Middleware cookies:', Object.fromEntries(request.cookies));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = request.cookies.get(name);
          // console.log(`Middleware getting cookie: ${name}:`, cookie?.value ? 'exists' : 'missing');
          return cookie?.value;
        },
        set(name: string, value: string, options) {
          console.log(`Middleware setting cookie: ${name}`);
          // Set cookie on the request
          request.cookies.set({
            name,
            value,
            ...options,
          });
          
          // We need to create a new response with the updated cookies
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          
          // Also set the cookie on the response
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options) {
          console.log(`Middleware removing cookie: ${name}`);
          request.cookies.delete(name);
          
          // We need to create a new response with the updated cookies
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          
          response.cookies.delete(name);
        },
      },
    }
  );

  try {
    // Check session with error handling
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Middleware session error:', error.message);
    }
    
    const isLoggedIn = !!data.session;
    const path = request.nextUrl.pathname;
    
    console.log(`Middleware path: ${path}, isLoggedIn: ${isLoggedIn}`);

    // Redirect if not authenticated
    if (!isLoggedIn && path.startsWith('/notes')) {
      console.log('Middleware: Not authenticated, redirecting to login');
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirect', path);
      return NextResponse.redirect(redirectUrl);
    }

    // Redirect if already authenticated and trying to access auth pages
    if (isLoggedIn && (path.startsWith('/login') || path.startsWith('/register'))) {
      console.log('Middleware: Already authenticated, redirecting to notes');
      return NextResponse.redirect(new URL('/notes', request.url));
    }

    // Ensure we pass through the latest auth cookies
    response.headers.set('x-middleware-cache', 'no-cache');
    return response;
  } catch (error) {
    console.error('Middleware unexpected error:', error);
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - auth/callback (auth callback)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|auth/callback).*)',
  ],
}; 