// src/app/noticia/[id]/page.tsx
'use client';

import { useEffect } from 'react';
import Footer from '@/shared/footer';
import Navbar from '@/shared/navbar';
import { useNoteById } from '@/hooks/useNotes';

// Definición de la interfaz de props para capturar el ID de la URL
interface NoticiaPageProps {
  params: {
    id: string; 
  };
}

export default function NoticiaPage({ params }: NoticiaPageProps) {
    const noteId = parseInt(params.id, 10);
    const { notes, loading, error } = useNoteById(noteId || null);
    const note = notes[0];

    if (loading) {
      return (
        <div className="bg-app-white min-h-screen">
          <Navbar />
          <main className="pt-10 pb-20 px-4 flex flex-col items-center">
            <div className="w-full max-w-5xl">
              <div className="h-64 bg-gray-200 rounded-lg animate-pulse mb-4" />
              <div className="h-12 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="h-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    if (error || !note) {
      return (
        <div className="bg-app-white min-h-screen">
          <Navbar />
          <main className="pt-10 pb-20 px-4 flex flex-col items-center">
            <div className="w-full max-w-5xl text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Error al cargar la noticia
              </h1>
              <p className="text-gray-600">
                {error?.message || 'La noticia no fue encontrada'}
              </p>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    const formattedDate = new Date(note.createdAt).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <div className="bg-app-white min-h-screen">
        <Navbar />

        {/* Contenedor principal centrado, similar al cuerpo de la imagen */}
        <main className="pt-10 pb-20 px-4 flex flex-col items-center">
          {/* Contenedor de la Noticia Completa (limitado a max-width) */}
          <article className="w-full max-w-5xl bg-white p-6 md:p-10">
            {/* TÍTULO PRINCIPAL CENTRADO */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-[#79170f] text-center">
              {note.title}
            </h1>

            {/* SECCIÓN DE IMAGEN Y TEXTO INTRODUCTORIO (Grid/Flex) */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* 1. Imagen (Incluyendo Metadatos) */}
              <div className="relative">
                <img
                  src={
                    note.banner ||
                    '/images/banner.png'
                  }
                  alt={note.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                {/* Metadatos sobre la Imagen (Tipo y Fecha) */}
                <div className="absolute top-4 left-4 flex gap-4 text-white font-semibold">
                  {/* Tipo (Etiqueta azul/gris) */}
                  <span className="bg-[#77a5c2] px-3 py-1 text-sm rounded-full">
                    {note.contentType}
                  </span>
                  {/* Fecha */}
                  <span className="bg-black bg-opacity-50 px-3 py-1 text-sm rounded-full">
                    {formattedDate}
                  </span>
                </div>
              </div>

              {/* 2. Párrafo Introductorio (Lado derecho de la imagen) */}
              <div className="flex flex-col justify-between">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {note.description}
                </p>
                {note.author && (
                  <p className="mt-4 text-base text-gray-600 italic">
                    Autor: {note.author.name} {note.author.surName}
                  </p>
                )}
              </div>
            </div>

            {/* CUERPO PRINCIPAL DEL ARTÍCULO */}
            <div className="mt-10 border-t border-gray-200 pt-8">
              <p
                className="text-lg text-gray-800 leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: note.content }}
              />

              {/* CATEGORÍAS */}
              {note.categories && note.categories.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  <span className="font-semibold text-gray-700">
                    Categorías:
                  </span>
                  {note.categories.map((pc) => (
                    <span
                      key={pc.categoryId}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {pc.category.name}
                    </span>
                  ))}
                </div>
              )}

              {/* GALERÍA DE IMÁGENES */}
              {note.galleryImages && note.galleryImages.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Galería
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {note.galleryImages.map((img) => (
                      <img
                        key={img.id}
                        src={img.path}
                        alt={img.altText || 'Imagen de galería'}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ARCHIVO ADJUNTO */}
              {note.attachment && (
                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                  <p className="text-gray-700 font-semibold mb-2">
                    Archivo adjunto:
                  </p>
                  <a
                    href={note.attachment.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {note.attachment.filename}
                  </a>
                </div>
              )}
            </div>
          </article>
        </main>

        <Footer />
      </div>
    );
}