"use client";

import { Button } from "@/components/ui/button";
import { NoteForm } from "@/components/notes/note-form";
import { useNotes } from "@/lib/contexts/notes-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function NotePage({ params }: { params: { id: string } }) {
  const { getNoteById, updateNote, deleteNote } = useNotes();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  
  const note = getNoteById(params.id);
  
  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold mb-4">Note not found</h1>
        <p className="text-muted-foreground mb-6">
          The note you are looking for does not exist or has been deleted.
        </p>
        <Button asChild>
          <Link href="/notes">Back to Notes</Link>
        </Button>
      </div>
    );
  }
  
  const handleUpdateNote = (data: { title: string; content: string; tags?: string[] }) => {
    updateNote(note.id, data);
    setIsEditing(false);
    toast.success("Note updated successfully!");
  };
  
  const handleDeleteNote = () => {
    deleteNote(note.id);
    toast.success("Note deleted successfully!");
    router.push("/notes");
  };
  
  const formattedDate = new Date(note.updatedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/notes">Back to Notes</Link>
        </Button>
        <div className="flex gap-2">
          {!isEditing && (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={handleDeleteNote}>
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
      
      {isEditing ? (
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
          <NoteForm
            initialValues={note}
            onSubmit={handleUpdateNote}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{note.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Last updated on {formattedDate}
            </p>
          </div>
          
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-xs bg-secondary px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{note.content}</p>
          </div>
        </div>
      )}
    </div>
  );
} 