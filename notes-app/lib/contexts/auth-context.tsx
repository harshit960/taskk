import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, getCurrentUser, getCurrentSession } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  signInWithGoogle: () => Promise<{ success: boolean; error: string | null }>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Function to refresh the session
  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error refreshing session:', error.message);
        return;
      }
      
      console.log('Session refresh result:', data.session ? 'Session found' : 'No session');
      setSession(data.session);
      setUser(data.session?.user || null);
    } catch (error) {
      console.error('Error refreshing session:', error);
    }
  };

  useEffect(() => {
    // Initialize session
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        // Try to get the session from Supabase
        const session = await getCurrentSession();
        console.log('Initial session check:', session ? 'Session found' : 'No session');
        if (session) {
          console.log('Session user:', session.user?.email || 'No email');
        }
        setSession(session);
        setUser(session?.user || null);
        
        // If we're in a protected route but have no session, attempt refresh
        if (!session && window.location.pathname.startsWith('/notes')) {
          console.log('No session in protected route, attempting refresh');
          await refreshSession();
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state changed:', event, newSession ? 'Session exists' : 'No session');
        if (newSession) {
          console.log('New session user:', newSession.user?.email || 'No email');
        }
        
        setSession(newSession);
        setUser(newSession?.user || null);
        setIsLoading(false);
        
        // When signing in, ensure we update page state
        if (event === 'SIGNED_IN') {
          router.refresh();
        }
      }
    );

    return () => {
      // Clean up subscription when component unmounts
      subscription.unsubscribe();
    };
  }, [router]);

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Sign up error:', error.message);
        return { success: false, error: error.message };
      }

      toast.success('Verification email sent! Please check your inbox.');
      return { success: true, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error.message);
        return { success: false, error: error.message };
      }

      console.log('Signed in successfully:', data.session ? 'Session exists' : 'No session');
      if (data.session?.user) {
        console.log('Signed in user:', data.session.user.email || 'No email');
      }
      
      toast.success('Signed in successfully!');
      
      // Refresh the session state after login
      await refreshSession();
      
      // Wait briefly to ensure the session is updated before navigating
      setTimeout(() => {
        router.push('/notes');
      }, 100);
      
      return { success: true, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  // Sign in with Google OAuth
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Google sign in error:', error.message);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Google sign in error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Error signing out');
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 