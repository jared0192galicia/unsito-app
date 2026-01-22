'use client';

import Hero from '@/components/home/hero';
import NoteTemplate, { NoteDetails } from '../shared/noteTemplate';
import Footer from '@/shared/footer';
import Navbar from '@/shared/navbar';
import Animate from '@/shared/animation';
import React, { useEffect, useState } from 'react';
import { useNotes } from '@/hooks/useNotes';

// Componente principal Home
export default function Home() {
  const { notes, loading } = useNotes();
  const [newsItems, setNewsItems] = useState<NoteDetails[]>([]);

  useEffect(() => {
    // Convertir los primeros 4 items del API al formato esperado por NoteTemplate
    const items: NoteDetails[] = notes.slice(0, 4).map((note: any) => ({
      id: String(note.id),
      title: note.title,
      banner: note.banner || '/images/banner.png',
      type: note.contentType,
      date: new Date(note.createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      body: note.content || note.description,
    }));
    setNewsItems(items);
  }, [notes]);

  return (
    <div className="bg-app-white">
      <Navbar></Navbar>
      <Hero></Hero>
      <div className="min-h-screen p-8 bg-gray-50">
        {/* Título de la Sección */}
        <Animate>
          <h1 className="text-4xl font-bold mb-12 text-center text-[#79170f]">
            Últimas noticias
          </h1>
        </Animate>
        {/* Contenedor del Grid */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-96 rounded-lg bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {newsItems.map((note) => (
                <Animate key={note.id} className="w-full">
                  <NoteTemplate note={note} />
                </Animate>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
