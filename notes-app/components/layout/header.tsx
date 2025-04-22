"use client";

import { useAuth } from "@/lib/contexts/auth-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./user-menu";

export function Header() {
  const { user, isLoading } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Notes App</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/notes" className="transition-colors hover:text-foreground/80">
              Notes
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {!isLoading && !user ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          ) : !isLoading && user ? (
            <UserMenu />
          ) : null}
        </div>
      </div>
    </header>
  );
} 