import { Note } from "@/types/note";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { queryKeys } from "@/lib/utils/query-keys";

// Local storage functions
const getNotes = (): Note[] => {
  if (typeof window === 'undefined') return [];
  
  const storedNotes = localStorage.getItem('notes');
  if (!storedNotes) return [];
  
  try {
    const parsedNotes = JSON.parse(storedNotes);
    // Convert string dates back to Date objects
    return parsedNotes.map((note: any) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt),
    }));
  } catch (error) {
    console.error("Failed to parse notes from localStorage:", error);
    return [];
  }
};

const saveNotes = (notes: Note[]): void => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

// React Query hooks
export const useNotes = () => {
  return useQuery({
    queryKey: queryKeys.notes.lists(),
    queryFn: getNotes,
    staleTime: Infinity, // Since we're using localStorage, we don't need to refetch automatically
  });
};

export const useNote = (id: string) => {
  return useQuery({
    queryKey: queryKeys.notes.detail(id),
    queryFn: () => {
      const notes = getNotes();
      return notes.find(note => note.id === id);
    },
    staleTime: Infinity,
  });
};

export const useAddNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (noteData: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date();
      const newNote: Note = {
        ...noteData,
        id: uuidv4(),
        createdAt: now,
        updatedAt: now,
      };
      
      const notes = getNotes();
      const updatedNotes = [...notes, newNote];
      saveNotes(updatedNotes);
      
      return newNote;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.lists() });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Note> }) => {
      const notes = getNotes();
      const updatedNotes = notes.map((note) =>
        note.id === id
          ? { ...note, ...data, updatedAt: new Date() }
          : note
      );
      
      saveNotes(updatedNotes);
      const updatedNote = updatedNotes.find(note => note.id === id);
      if (!updatedNote) throw new Error(`Note with id ${id} not found`);
      return updatedNote;
    },
    onSuccess: (updatedNote) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.detail(updatedNote.id) });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const notes = getNotes();
      const updatedNotes = notes.filter(note => note.id !== id);
      saveNotes(updatedNotes);
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.detail(id) });
    },
  });
}; 