'use client';

import Hero from '@/components/home/hero';
import NoteTemplate from '@shared/noteTemplate';
import Footer from '@/shared/footer';
import Navbar from '@/shared/navbar';
import Animate from '@/shared/animation';
import React, { useEffect, useState } from 'react';
import { useNotes, useNotesByCategory } from '@/hooks/useNotes';

interface _NoteDetails {
  title: string;
  banner: string;
  type: string;
  date: string;
  body: string;
}

const commonBanner = '/images/banner.png';

// 4. Modifica el componente principal Home
export default function Home() {
  const { notes, loading: allLoading } = useNotes();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const newsItems = notes.map((note: any) => ({
      id: note.id,
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
    setData(newsItems);
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
        <div className="max-w-7xl mx-auto">
          {/* Ajusté max-w-15xl a 7xl que es más estándar, pero puedes dejar el tuyo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.map((note: any, index: number) => (
              <Animate key={index} className="w-full">
                {/* Asegúrate de que Animate permita pasar una clase o que su contenido sea w-full */}
                <NoteTemplate note={note} />
              </Animate>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
