'use client';

import { FileBox, Save, Trash2 } from 'lucide-react';
import { ControlButton } from '@/shared/ui/button';
import { SiGooglegemini } from 'react-icons/si';
import Button from '@/shared/ui/adminButton';
import { useEffect, useState } from 'react';
import api from '@/services/magicFetch';
import { AxiosResponse } from 'axios';
import Input from '@/shared/ui/input';
import dynamic from 'next/dynamic';
import cn from '@/utils/cn';
import { Calendar } from 'primereact/calendar';
import { Nullable } from 'primereact/ts-helpers';
import CalendarPiker from '@/shared/ui/calendar';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { BiCloset } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import ImagePicker from '@/shared/ui/imagePicker';
import { useNotificationStore } from '@/context/useNotificationStore';

const Editor = dynamic(
  () => import('primereact/editor').then((mod) => mod.Editor),
  { ssr: false },
);

interface NewNote {
  tittle: string;
  content: string;
  description: string;
  dateRange: Nullable<(Date | null)[]>;
  tags: string[];
  banner: string;
}

export default function FormPage({ close }: any) {
  // const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [form, setForm] = useState<NewNote>({
    tittle: '',
    content: '',
    description: '',
    dateRange: null,
    tags: [],
    banner: '',
  });

  const pushNotification = useNotificationStore((s) => s.push);

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleChange = (name: string, value: any) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const fetchOptions = async () => {
    try {
      const response: AxiosResponse = await api.site.getTags();
      console.log('🚀 ~ response:', response.data);
      setTags(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDiscard = () => {
    if (confirm('¿Seguro que deseas descartar los cambios?')) {
      close();
    }
  };

  const handleSaveDraft = () => {
    console.log(form);
  };

  const makeBody = (): {
    title: string;
    content: string;
    description: string;
    date: string;
    banner: any;
    tags: number[];
  } => {
    const date = form.dateRange?.map((d) => d?.toISOString()).join(' - ') || '';
    const tags = form.tags.map((tag: any) => tag.id);
    return {
      title: form.tittle,
      content: form.content,
      description: form.description,
      banner: form.banner,
      tags,
      date,
    };
  };

  const handleSave = async () => {
    try {
      const response: AxiosResponse = await api.admin.postNew({
        body: makeBody(),
      });
      pushNotification({
        title: 'Guardado',
        description: 'Publicación guarada correctamente',
        type: 'success',
        duration: 4_000,
      });
    } catch (error) {
      console.log(error);
      pushNotification({
        title: 'Error',
        description: 'Error al guaradar la publicación',
        type: 'error',
        duration: 4_000,
      });
    }
  };

  return (
    <div className="min-hscreen w-screen bg-app-soft-white px-6 py-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-app-blue-900">
          Crear nueva noticia
        </h1>
        <CgClose
          className={cn(
            'text-2xl text-gray-500 hover:text-app-blue-800 cursor-pointer items-center',
          )}
          onClick={close}
        />
      </div>

      <div className="flex gap-4 mt-6 bg-app-white p-3 my-3 px-2 rounded-lg justify-between">
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
            icon={<SiGooglegemini className="text-xl" />}
          />
          <ControlButton
            label="Sugerencias"
            type="primary"
            onClick={handleDiscard}
            icon={<SiGooglegemini className="text-xl" />}
          />
        </div>
      </div>

      <section className="flex w-full gap-5">
        <div
          className={cn(
            'bg-app-white p-6 rounded-xl shadow-lg border border-app-blue-600/20',
            'flex-1 flex flex-col justify-between',
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
          <div className="flex flex-col">
            <label className="text-sm font-medium text-app-blue-800">
              Fecha
            </label>
            <Calendar
              value={form.dateRange}
              selectionMode="range"
              onChange={(e) => {
                handleChange('dateRange', e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-app-blue-800">
              Etiquetas
            </label>
            <MultiSelect
              value={form.tags}
              onChange={(e: MultiSelectChangeEvent) =>
                handleChange('tags', e.value)
              }
              options={tags}
              optionLabel="name"
              filter
              filterDelay={400}
              maxSelectedLabels={3}
              // selectedItemsLabel='Seleccionados'
              className="w-full md:w-20rem"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-app-blue-800">
              Banner
            </label>
            <ImagePicker
              onChange={(src) => {
                handleChange('banner', src);
              }}
            />
          </div>
        </div>
        <div
          className={cn(
            'bg-app-white p-6 rounded-xl shadow-lg border border-app-blue-600/20',
            'flex-2',
          )}
        >
          <Editor
            value={form.content}
            onTextChange={(e) => handleChange('content', e.htmlValue ?? '')}
            style={{ height: '450px' }}
            placeholder="Escribe el contenido de la noticia aquí..."
            className="border border-app-blue-700/30 rounded-md"
          />
        </div>
      </section>
    </div>
  );
}
