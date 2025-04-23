import { createServerClient } from '@supabase/ssr';
import { NextRequest } from 'next/server';

/**
 * Creates a Supabase server client with cookies from the request
 */
export function createSupabaseServerClient(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set() {
          // We don't need to set cookies in this context
        },
        remove() {
          // We don't need to remove cookies in this context
        },
      },
    }
  );
}

/**
 * Gets the current authenticated user from the request
 * Returns the user and user_id if authenticated, or null if not
 */
export async function getCurrentUser(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient(request);
    const { data, error } = await supabase.auth.getUser();
    
    if (error || !data.user) {
      console.error('Error getting user:', error?.message || 'No user found');
      return null;
    }
    
    return {
      user: data.user,
      user_id: data.user.id
    };
  } catch (error) {
    console.error('Unexpected error getting user:', error);
    return null;
  }
} 