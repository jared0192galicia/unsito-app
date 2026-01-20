'use client';

import { useState, useMemo, useEffect } from 'react';
import NewsFilterBar from '@/components/notes/tags';
import Footer from '@/shared/footer';
import Navbar from '@/shared/navbar';
import NoteTemplate, { NoteDetails } from '@/shared/noteTemplate';
import { useNotes, useNotesByCategory } from '@/hooks/useNotes';

export default function Home() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Obtener notas según la categoría seleccionada
  const { notes: notesByCategory, loading: categoryLoading } = useNotesByCategory(selectedCategoryId);
  const { notes: allNotes, loading: allLoading } = useNotes();

  const notes = selectedCategoryId ? notesByCategory : allNotes;
  const loading = selectedCategoryId ? categoryLoading : allLoading;

  // Filtrar por búsqueda
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch = 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [notes, searchQuery]);

  // Convertir datos de la API al formato esperado por NoteTemplate
  const newsItems: NoteDetails[] = filteredNotes.map((note: any) => ({
    id: note.id,
    title: note.title,
    banner: note.banner || 'https://via.placeholder.com/600x400?text=Sin+imagen',
    type: note.contentType,
    date: new Date(note.createdAt).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    body: note.content || note.description,
  }));

  return (
    <div className="bg-app-white">
      <Navbar></Navbar>
      <div className="min-h-screen p-8 bg-gray-50">
        <h1 className="text-4xl font-bold mb-12 text-center text-[#79170f]">
          Noticias de la Universidad de la Sierra Sur
        </h1>

        <NewsFilterBar 
          onCategoryChange={setSelectedCategoryId}
          onSearchChange={setSearchQuery}
        />

        {loading ? (
          <div className="max-w-15xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-96 rounded-lg bg-gray-200 animate-pulse" />
              ))}
            </div>
          </div>
        ) : newsItems.length > 0 ? (
          <div className="max-w-15xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 align-items-center justify-items-center">
              {newsItems.map((note) => (
                <NoteTemplate key={note.id} note={note} />
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-15xl mx-auto text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron noticias
            </p>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}
