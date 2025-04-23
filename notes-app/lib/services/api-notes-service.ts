import { Note } from '@/types/note';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/utils/query-keys';

// Base API URL
const API_URL = '/api/notes';

// Fetch functions
const fetchNotes = async (): Promise<Note[]> => {
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch notes');
  }
  
  return response.json();
};

const fetchNote = async (id: string): Promise<Note> => {
  const response = await fetch(`${API_URL}/${id}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch note');
  }
  
  return response.json();
};

// Mutation functions
const createNote = async (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(noteData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create note');
  }
  
  return response.json();
};

const updateNote = async ({ id, data }: { id: string; data: Partial<Note> }): Promise<Note> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update note');
  }
  
  return response.json();
};

const deleteNote = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete note');
  }
};

// React Query hooks
export const useNotes = () => {
  return useQuery({
    queryKey: queryKeys.notes.lists(),
    queryFn: fetchNotes,
  });
};

export const useNote = (id: string) => {
  return useQuery({
    queryKey: queryKeys.notes.detail(id),
    queryFn: () => fetchNote(id),
    enabled: !!id, // Only run the query if id is provided
  });
};

export const useAddNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.lists() });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateNote,
    onSuccess: (updatedNote) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.lists() });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.notes.detail(updatedNote.id) 
      });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteNote,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.lists() });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.notes.detail(variables) 
      });
    },
  });
}; 
export const useSummarizeNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (content: string) => {
      const response = await fetch(`/api/notes/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to summarize note');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.lists() });
      return data;
    },
  });
};
