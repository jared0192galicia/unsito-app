'use client';

import Button from '@/shared/ui/adminButton';
import { ControlButton } from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import cn from '@/utils/cn';
import { FileBox, Plus, Save, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { SiGooglegemini } from 'react-icons/si';

const Editor = dynamic(
  () => import('primereact/editor').then((mod) => mod.Editor),
  { ssr: false }
);

interface NewNote {
  title?: string;
  content?: string;
  description?: string;
  date?: string;
  tags?: string[];
  banner?: string;
}

export default function NuevaNoticiaPage() {
  const [content, setContent] = useState('');
  const [form, setForm] = useState<NewNote>({});

  const handleChange = (name: string, value: string) =>
    setForm((prev) => ({ ...prev, [name]: value }));

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

      <div className="flex gap-4 mt-8 bg-app-white p-3 my-3 px-2 rounded-lg justify-between">
        <div className="flex gap-4">
          <Button variant="discard" onClick={handleDiscard}>
            <Trash2 /> Descartar
          </Button>

          <Button variant="draft" onClick={handleSaveDraft}>
            <FileBox /> Guardar borrador
          </Button>

          <Button variant="save" onClick={handleSave}>
            <Save /> Guardar
          </Button>
        </div>
        <div className="flex gap-4">
          <ControlButton
            label="Revisar"
            type="primary"
            onClick={handleDiscard}
            icon={<SiGooglegemini className='text-xl' />}
          />
          <ControlButton
            label="Sugerencias"
            type="primary"
            onClick={handleDiscard}
            icon={<SiGooglegemini className='text-xl' />}
          />
        </div>
      </div>

      <section className="flex w-full gap-5">
        <div
          className={cn(
            'bg-app-white p-6 rounded-xl shadow-lg border border-app-blue-600/20',
            'flex-1 flex flex-col justify-between'
          )}
        >
          <Input
            className="text-app-gray-800 border-none"
            change={handleChange}
            label="Título"
            name="tittle"
          />
          <Input
            className="text-app-gray-800 border-none"
            change={handleChange}
            label="Descripcion"
            name="description"
          />
          <Input
            className="text-app-gray-800 border-none"
            change={handleChange}
            label="Fecha"
            name="date"
          />
          <Input
            className="text-app-gray-800 border-none"
            change={handleChange}
            label="Etiquetas"
            name="tags"
          />
          <Input
            className="text-app-gray-800 border-none"
            change={handleChange}
            label="Banner / Hero"
            name="banner"
          />
        </div>
        <div
          className={cn(
            'bg-app-white p-6 rounded-xl shadow-lg border border-app-blue-600/20',
            'flex-2'
          )}
        >
          <Editor
            value={content}
            onTextChange={(e) => setContent(e.htmlValue ?? '')}
            style={{ height: '450px' }}
            placeholder="Escribe el contenido de la noticia aquí..."
            className="border border-app-blue-700/30 rounded-md"
          />
        </div>
      </section>
    </div>
  );
}
