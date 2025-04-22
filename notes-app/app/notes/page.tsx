"use client";

import { Button } from "@/components/ui/button";
import { NotesList } from "@/components/notes/notes-list";
import { useState } from "react";
import { NoteForm } from "@/components/notes/note-form";
import { toast } from "sonner";
import { useNotes, useAddNote, useDeleteNote } from "@/lib/services/notes-service";

export default function NotesPage() {
  const { data: notes = [] } = useNotes();
  const addNoteMutation = useAddNote();
  const deleteNoteMutation = useDeleteNote();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNote = (data: { title: string; content: string; tags?: string[] }) => {
    addNoteMutation.mutate(data, {
      onSuccess: () => {
        setIsCreating(false);
        toast.success("Note created successfully!");
      },
      onError: (error) => {
        toast.error(`Failed to create note: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    });
  };

  const handleDeleteNote = (id: string) => {
    deleteNoteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Note deleted successfully!");
      },
      onError: (error) => {
        toast.error(`Failed to delete note: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    });
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
        <NotesList 
          notes={notes} 
          onDelete={handleDeleteNote} 
          isLoading={addNoteMutation.isPending || deleteNoteMutation.isPending}
        />
      )}
    </div>
  );
} 