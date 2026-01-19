import { useState, useEffect, useCallback } from 'react';
import { Post, getAllNotes, getNoteById, getAllCategories, getNotesByCategory } from '@/services/notesService';

interface UseNotesReturn {
  notes: Post[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface UseNoteByIdReturn extends UseNotesReturn {
  notes: Post[];
}

interface UseCategoriesReturn {
  categories: any[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook para obtener todas las noticias
 */
export function useNotes(): UseNotesReturn {
  const [notes, setNotes] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllNotes();
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { notes, loading, error, refetch: fetchNotes };
}

/**
 * Hook para obtener una noticia por ID
 */
export function useNoteById(id: number | null): UseNoteByIdReturn {
  const [notes, setNotes] = useState<Post[]>([]);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<Error | null>(null);

  const fetchNote = useCallback(async () => {
    if (!id) {
      setNotes([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getNoteById(id);
      setNotes([data]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  return { notes, loading, error, refetch: fetchNote };
}

/**
 * Hook para obtener todas las categorías
 */
export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
}

/**
 * Hook para obtener noticias por categoría
 */
export function useNotesByCategory(categoryId: number | null): UseNotesReturn {
  const [notes, setNotes] = useState<Post[]>([]);
  const [loading, setLoading] = useState(!!categoryId);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotes = useCallback(async () => {
    if (!categoryId) {
      setNotes([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getNotesByCategory(categoryId);
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { notes, loading, error, refetch: fetchNotes };
}
