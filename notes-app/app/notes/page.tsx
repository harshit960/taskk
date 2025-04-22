"use client";

import { Button } from "@/components/ui/button";
import { NotesList } from "@/components/notes/notes-list";
import { useNotes } from "@/lib/contexts/notes-context";
import { useState } from "react";
import { NoteForm } from "@/components/notes/note-form";
import { toast } from "sonner";

export default function NotesPage() {
  const { notes, addNote, deleteNote } = useNotes();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNote = (data: { title: string; content: string; tags?: string[] }) => {
    addNote(data);
    setIsCreating(false);
    toast.success("Note created successfully!");
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
    toast.success("Note deleted successfully!");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Notes</h1>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)}>Create Note</Button>
        )}
      </div>

      {isCreating ? (
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-semibold mb-4">Create New Note</h2>
          <NoteForm 
            onSubmit={handleCreateNote} 
            onCancel={() => setIsCreating(false)} 
          />
        </div>
      ) : (
        <NotesList notes={notes} onDelete={handleDeleteNote} />
      )}
    </div>
  );
} 