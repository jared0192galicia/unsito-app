'use client';

import cn from '@/utils/cn';
import { FileBox, Save, Trash, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Editor = dynamic(
  () => import('primereact/editor').then((mod) => mod.Editor),
  { ssr: false }
);

export default function NuevaNoticiaPage() {
  const [content, setContent] = useState('');

  const handleDiscard = () => {
    if (confirm('¿Seguro que deseas descartar los cambios?')) {
      setContent('');
    }
  };

  const handleSaveDraft = () => {
    console.log('Guardando como borrador:', content);
  };

  const handleSave = () => {
    console.log('Guardando noticia:', content);
  };

  return (
    <div className="min-h-screen bg-app-soft-white px-6 py-10">
      <h1 className="text-3xl font-bold text-app-blue-900 mb-6">
        Crear nueva noticia
      </h1>

      <div className="flex gap-4 mt-8 bg-app-white p-3 my-3 px-2 rounded-lg">
        <button
          onClick={handleDiscard}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 bg-gray-300',
            'text- font-semibold hover:bg-gray-500 transition'
          )}
        >
          <Trash2 /> Descartar
        </button>

        <button
          onClick={handleSaveDraft}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-600 text-app-white',
            'font-semibold hover:bg-sky-800 transition'
          )}
        >
          <FileBox /> Guardar borrador
        </button>

        <button
          onClick={handleSave}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-500 text-app-white',
            'font-semibold hover:bg-teal-600 transition'
          )}
        >
          <Save /> Guardar
        </button>
      </div>

      <div className="bg-app-white p-6 rounded-xl shadow-lg border border-app-blue-600/20">
        <Editor
          value={content}
          onTextChange={(e) => setContent(e.htmlValue ?? '')}
          style={{ height: '450px' }}
          placeholder="Escribe el contenido de la noticia aquí..."
          className="border border-app-blue-700/30 rounded-md"
        />
      </div>
    </div>
  );
}
