'use client';

import Hero from '@/components/home/hero';
import NoteTemplate from '../shared/noteTemplate';
import Footer from '@/shared/footer';
import Navbar from '@/shared/navbar';
import Animate from '@/shared/animation';
import React, { useEffect } from 'react';
import { useNotes, useNotesByCategory } from '@/hooks/useNotes';

interface NoteDetails {
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

  useEffect(() => {
    
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
          {/* Ajusté max-w-15xl a 7xl que es más estándar, pero puedes dejar el tuyo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {notes.map((note: any, index) => (
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
