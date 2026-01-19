// src/shared/NoteTemplate.tsx
'use client';
import React from 'react';

export interface NoteDetails {
  id?: number;
  title: string;
  banner: string;
  type: string;
  date: string;
  body: string;
}

const NoteTemplate: React.FC<{ note: NoteDetails }> = ({ note }) => {
  return (
    // Contenedor principal de la Tarjeta
    // Estilos: Borde sutil, esquinas redondeadas, fondo blanco, y sombra para levantarla.
    <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-lg shadow-gray-400 border border-gray-200 bg-white">
      {/* Imagen/Banner de la Noticia */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={note.banner}
          alt={note.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido de Texto */}
      <div className="p-4 sm:p-6 md:p-10">
        {/* Metadatos (Tipo y Fecha) */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-m font-semibold px-3 py-1 rounded-full bg-[#a0c0d5] text-[#0e3d5b]">
            {note.type}
          </span>
          <span className="text-xs sm:text-sm text-gray-500">{note.date}</span>
        </div>

        {/* Título de la Noticia */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-800 mb-4 mt-7">
          {note.title}
        </h2>

        {/* Cuerpo de la Noticia (Solo el extracto) */}
        <p className="text-sm sm:text-base text-gray-600 mb-4 mt-2 line-clamp-4">
          {note.body}
        </p>

        {/* Enlace "Leer más" */}
        <a
          href={note.id ? `/noticia/${note.id}` : '#'}
          className="flex items-center text-xs sm:text-sm font-semibold text-[#77a5c2] hover:text-[#5e8399] transition duration-150"
        >
          Leer más →
        </a>
      </div>
    </div>
  );
};

export default NoteTemplate;
