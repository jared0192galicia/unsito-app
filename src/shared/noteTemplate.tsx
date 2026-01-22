// src/shared/NoteTemplate.tsx
'use client';
import React from 'react';
import Link from 'next/link';

export interface NoteDetails {
  id?: string;
  title: string;
  banner: string;
  type: string;
  date: string;
  body: string;
}

const NoteTemplate: React.FC<{ note: NoteDetails }> = ({ note }) => {
  return (
    <div className="w-full h-96 sm:h-[36rem] md:h-[44rem] flex flex-col rounded-2xl overflow-hidden shadow-lg shadow-gray-400 border border-gray-200 bg-white">
      
      {/* Imagen/Banner */}
      <div className="relative w-full h-1/2 overflow-hidden flex-shrink-0">
        <img
          src={note.banner}
          alt={note.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 sm:p-6 md:p-10 flex flex-col h-1/2 overflow-hidden">
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-m font-semibold px-3 py-1 rounded-full bg-[#a0c0d5] text-[#0e3d5b]">
            {note.type}
          </span>
          <span className="text-xs sm:text-sm text-gray-500">{note.date}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-800 mb-4 mt-7">
          {note.title}
        </h2>

        <div 
          className="text-sm sm:text-base text-gray-600 mb-4 mt-2 line-clamp-4 prose prose-slate max-w-none overflow-hidden"
          dangerouslySetInnerHTML={{ __html: note.body }} 
        />

        <Link
          href={`/noticia/${note.id}`}
          className="flex items-center text-xs sm:text-sm font-semibold text-[#77a5c2] hover:text-[#5e8399] transition duration-150 mt-auto"
        >
          Leer más →
        </Link>
      </div>
    </div>
  );
};

export default NoteTemplate;
