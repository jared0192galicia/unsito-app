'use client';

import Button from '@/shared/ui/adminButton';
import Input from '@/shared/ui/input';
import cn from '@/utils/cn';
import { Pencil, Plus, PlusCircle, Trash2 } from 'lucide-react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '@/services/usersService';
import FormPage from './form';

interface User {
  id: number;
  name: string;
  surName: string;
  username: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
  createdAt: string;
}

export default function CuentasPage() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const users = await getAllUsers();
      setData(users);
    } catch (error) {
      console.error('Error al obtener cuentas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta cuenta?')) {
      try {
        await deleteUser(id);
        fetchData();
      } catch (error) {
        console.error('Error al eliminar cuenta:', error);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchData();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES');
  };

  const actionBodyTemplate = (rowData: User) => {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(rowData)}
          className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => handleDelete(rowData.id)}
          className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
          <Trash2 size={16} />
        </button>
      </div>
    );
  };

  return (
    <section
      className={cn('min-h-screen bg-app-soft-white py-10', {
        'px-6': !showForm,
      })}
    >
      <div className="flex gap-4 bg-white p-3 my-3 px-3 rounded-lg">
        <Button variant="save" onClick={handleCreate}>
          <PlusCircle /> Crear Cuenta
        </Button>
      </div>

      <div className="bg-white rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Administración de Cuentas
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <DataTable
            value={data}
            scrollHeight="400"
            emptyMessage="No hay cuentas disponibles."
            rows={10}
            dataKey="id"
            stripedRows
            tableStyle={{ minWidth: '100%' }}
            paginator
            rowsPerPageOptions={[5, 10, 20]}
          >
            <Column field="id" header="ID" sortable style={{ width: '60px' }} />
            <Column
              field="name"
              header="Nombre"
              sortable
              filter
              style={{ width: '120px' }}
            />
            <Column
              field="surName"
              header="Apellido"
              sortable
              filter
              style={{ width: '120px' }}
            />
            <Column
              field="username"
              header="Usuario"
              sortable
              filter
              style={{ width: '120px' }}
            />
            <Column
              field="email"
              header="Correo"
              sortable
              filter
              style={{ width: '180px' }}
            />
            <Column
              field="role.name"
              header="Rol"
              sortable
              style={{ width: '100px' }}
            />
            <Column
              field="createdAt"
              header="Fecha Creación"
              body={(rowData) => formatDate(rowData.createdAt)}
              sortable
              style={{ width: '120px' }}
            />
            <Column
              body={actionBodyTemplate}
              header="Acciones"
              style={{ width: '100px' }}
            />
          </DataTable>
        )}
      </div>

      <div
        className={cn(
          'hidden bg-app-soft-white absolute top-0 wscreen h-full',
          { block: showForm }
        )}
      >
        <FormPage user={selectedUser} close={handleFormClose} />
      </div>
    </section>
  );
}
