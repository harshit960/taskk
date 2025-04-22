import { Note } from "@/types/note";
import { NoteCard } from "./note-card";

interface NotesListProps {
  notes: Note[];
  onDelete?: (id: string) => void;
}

export function NotesList({ notes, onDelete }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-lg text-muted-foreground mb-4">
          No notes found. Create your first note to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
} 