import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  // 
  // Create a response early so we can use it for cookie handling
  let response = NextResponse.redirect(new URL('/notes', request.url));

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    // Create a Supabase client with SSR cookie handling
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options) {
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options) {
            response.cookies.delete({
              name,
              ...options,
            });
          },
        },
      }
    );

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code);
  }

  // The cookies will be automatically set on our response
  return response;
} 