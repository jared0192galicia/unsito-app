'use client';

import Button from '@/shared/ui/adminButton';
import { ControlButton } from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import cn from '@/utils/cn';
import { FileBox, Pencil, Plus, PlusCircle, Save, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import api from '@/services/magicFetch';
import FormPage from './form';

const Editor = dynamic(
  () => import('primereact/editor').then((mod) => mod.Editor),
  { ssr: false },
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
  const [data, setData] = useState([]);
  const [selectNotes, setSelectNotes] = useState([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<'Edit' | 'Create'>('Create');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response: AxiosResponse = await api.admin.getNotes();
      console.log('🚀 ~ response:', response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDiscard = () => {};
  const handleEdit = () => {
    setFormMode('Edit');
    setShowForm(true);
  };

  const handleCreate = () => {
    // setSelectNotes([]);
    setFormMode('Create');
    setShowForm(true);
  };

  return (
    <section
      className={cn('min-h-screen bg-app-soft-white pt-2', {
        'px-6': !showForm,
      })}
    >
      <div className="flex gap-4 bg-white p-3 my-4 px-3 rounded-lg">
        <Button variant="discard" onClick={handleDiscard}>
          <Trash2 /> Eliminar
        </Button>

        <Button variant="draft" onClick={handleEdit}>
          <Pencil /> Editar
        </Button>

        <Button variant="save" onClick={handleCreate}>
          <PlusCircle /> Crear
        </Button>
      </div>
      <div className={cn({ hidden: showForm })}>
        <DataTable
          value={data}
          scrollHeight="600px"
          emptyMessage="No hay noticias disponibles."
          rows={5}
          dataKey="id"
          selection={selectNotes}
          selectionMode={'multiple'}
          onSelectionChange={(e) => setSelectNotes(e.value)}
          // globalFilter={globalFilter}
          stripedRows
          tableStyle={{ minWidth: '40rem' }}
        >
          <Column selectionMode="single" headerStyle={{ width: '3rem' }} />

          <Column field="id" header="ID" sortable style={{ width: '80px' }} />
          <Column field="title" header="Titulo" sortable filter />
          <Column field="description" header="Descripción" sortable filter />
          <Column field="contentType" header="Tipo" sortable filter />
        </DataTable>
      </div>

      <div
        className={cn(
          'hidden bg-app-soft-white absolute top-0 wscreen h-full',
          { block: showForm },
        )}
      >
        <FormPage
          close={() => setShowForm(false)}
          data={selectNotes}
          mode={formMode}
        />
      </div>
    </section>
  );
}
