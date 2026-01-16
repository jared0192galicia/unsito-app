'use client';

import Button from '@/shared/ui/adminButton';
import { ControlButton } from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import cn from '@/utils/cn';
import { FileBox, Pencil, Plus, PlusCircle, Save, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';

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

  const handleDiscard = () => {}

  return (
    <section className="min-h-screen bg-app-soft-white px-6 py-10">
      <div className="flex gap-4 bg-white p-3 my-3 px-3 rounded-lg">
        <Button variant="discard" onClick={handleDiscard}>
          <Trash2 /> Eliminar
        </Button>

        <Button variant="draft" onClick={handleDiscard}>
          <Pencil /> Editar
        </Button>

        <Button variant="save" onClick={handleDiscard}>
          <PlusCircle /> Crear
        </Button>
      </div>
      <div>
        <DataTable
          value={[]}
          scrollHeight='400'
          emptyMessage="No hay noticias disponibles."
          rows={5}
          dataKey="id"
          // selection={selectedUsers}
          // onSelectionChange={(e) => setSelectedUsers(e.value as User[])}
          // globalFilter={globalFilter}
          stripedRows
          tableStyle={{ minWidth: '40rem' }}
        >
          <Column selectionMode="single" headerStyle={{ width: '3rem' }} />

          <Column field="id" header="ID" sortable style={{ width: '80px' }} />
          <Column field="name" header="Titulo" sortable filter />
          <Column field="email" header="Correo" sortable filter />
          <Column field="country" header="País" sortable filter />
        </DataTable>
      </div>
    </section>
  );
}
