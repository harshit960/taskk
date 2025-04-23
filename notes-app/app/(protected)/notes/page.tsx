"use client";

import { Button } from "@/components/ui/button";
import { NotesList } from "@/components/notes/notes-list";
import { useState, useMemo } from "react";
import { NoteForm } from "@/components/notes/note-form";
import { toast } from "sonner";
import { useNotes, useAddNote, useDeleteNote, useSummarizeNote } from "@/lib/services/api-notes-service";
import { SearchFilter } from "@/components/notes/search-filter";

export default function NotesPage() {
  const { data: notes = [] } = useNotes();
  const addNoteMutation = useAddNote();
  const deleteNoteMutation = useDeleteNote();
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

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

  // Extract all tags from all notes
  const allTags = useMemo(() => {
    return notes.flatMap(note => note.tags || []);
  }, [notes]);

  // Filter notes based on search query and active tag
  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const matchesSearch = searchQuery === "" || 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        note.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = !activeTag || 
        (note.tags && note.tags.includes(activeTag));
      
      return matchesSearch && matchesTag;
    });
  }, [notes, searchQuery, activeTag]);

  return (
    <div className="space-y-8">
      {/* <div className="flex items-center justify-between">
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)}>Create Note</Button>
        )}
      </div> */}

      {!isCreating && (
        <SearchFilter 
          title="Your Notes"
          onSearch={setSearchQuery}
          onFilterByTag={setActiveTag}
          activeTag={activeTag}
          availableTags={allTags}
          onCreateNote={() => setIsCreating(true)}
        />
      )}

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
          notes={filteredNotes} 
          onDelete={handleDeleteNote} 
          isLoading={addNoteMutation.isPending || deleteNoteMutation.isPending}
        />
      )}
    </div>
  );
} 