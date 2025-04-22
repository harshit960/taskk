'use client';

import { NotesProvider } from "@/lib/contexts/notes-context";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NotesProvider>
      {children}
    </NotesProvider>
  );
} 