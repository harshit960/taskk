"use client";

import { useAuth } from "@/lib/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, refreshSession } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [redirecting, setRedirecting] = useState(false);

  // Only attempt redirects after the component has mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Wait for both mounting and loading to complete before deciding to redirect
    const handleAuthState = async () => {
      // Skip if we're already handling a redirect or not mounted yet
      if (redirecting || !mounted) return;
      
      // If still loading, wait
      if (isLoading) return;
      
      // We have a user, render the children
      if (user) {
        console.log('Protected route: User is authenticated:', user.email);
        return;
      }
      
      // No user found, but let's try refreshing a few times before redirecting
      if (!user && retryCount < 2) {
        console.log(`Protected route: No user found, refreshing session (attempt ${retryCount + 1})`);
        setRetryCount(prev => prev + 1);
        await refreshSession();
        return;
      }
      
      // If we've tried refreshing and still have no user, redirect to login
      if (!user && retryCount >= 2 && !redirecting) {
        console.log('Protected route: Multiple refresh attempts failed, redirecting to login');
        setRedirecting(true);
        router.replace("/login");
      }
    };
    
    handleAuthState();
  }, [isLoading, user, router, mounted, refreshSession, retryCount, redirecting]);

  // Show loading spinner while checking authentication
  if (isLoading || !mounted || (retryCount > 0 && retryCount < 3 && !user)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-sm text-muted-foreground">Verifying authentication...</p>
      </div>
    );
  }

  // If authenticated, render children
  return user ? <>{children}</> : null;
} 