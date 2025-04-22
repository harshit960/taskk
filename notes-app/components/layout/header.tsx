"use client";

import { useAuth } from "@/lib/contexts/auth-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./user-menu";
import { NotebookPen } from "lucide-react";

export function Header() {
  const { user, isLoading } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 mr-8">
            <NotebookPen className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Notes App</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link 
              href="/notes" 
              className="text-muted-foreground hover:text-foreground transition-colors relative py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Notes
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {!isLoading && !user ? (
            <>
              <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" className="font-medium" asChild>
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