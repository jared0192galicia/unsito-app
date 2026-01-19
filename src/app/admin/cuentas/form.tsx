'use client';

import { Save, Trash2, ArrowLeft } from 'lucide-react';
import Button from '@/shared/ui/adminButton';
import Input from '@/shared/ui/input';
import { useState } from 'react';
import { createUser } from '@/services/usersService';
import cn from '@/utils/cn';

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
}

interface FormData {
  name: string;
  surName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  roleId: number;
}

export default function FormPage({ user, close }: { user: User | null; close: () => void }) {
  const [form, setForm] = useState<FormData>({
    name: user?.name || '',
    surName: user?.surName || '',
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
    roleId: user?.role?.id || 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [roles] = useState([
    { id: 1, name: 'admin' },
    { id: 2, name: 'editor' },
  ]);

  const handleChange = (name: string, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(''); // Limpiar error al escribir
  };

  const validateForm = () => {
    if (!form.name || !form.surName || !form.username || !form.email) {
      setError('Todos los campos son requeridos');
      return false;
    }

    if (!user && !form.password) {
      setError('La contraseña es requerida para nuevas cuentas');
      return false;
    }

    if (form.password && form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    if (form.password && form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('El correo no es válido');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    setError('');
    
    if (!validateForm()) return;

    try {
      setLoading(true);

      // Log para debugging
      const payload = {
        name: form.name,
        surname: form.surName,
        username: form.username,
        email: form.email,
        password: form.password,
      };
      console.log('Enviando datos:', payload);

      if (user) {
        // Para editar, necesitarías implementar un endpoint PUT en el backend
        setError('La edición de cuentas aún no está implementada');
      } else {
        // Crear nuevo usuario
        await createUser(payload);
        
        close();
      }
    } catch (error: any) {
      console.error('Error completo:', error);
      
      let errorMessage = 'Error al guardar la cuenta';
      
      // Manejo de errores del servidor
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error?.response?.data?.issues) {
        // Si es un error de validación de Zod
        const issues = error.response.data.issues || [];
        if (Array.isArray(issues) && issues.length > 0) {
          errorMessage = issues.map((issue: any) => issue.message).join(', ');
        }
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    if (confirm('¿Seguro que deseas descartar los cambios?')) {
      close();
    }
  };

  return (
    <div className="min-h-screen w-screen bg-app-soft-white px-6 py-10">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={close}
          className="p-2 hover:bg-gray-200 rounded-lg transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-app-blue-900">
          {user ? 'Editar Cuenta' : 'Crear Nueva Cuenta'}
        </h1>
      </div>

      <div className="bg-white rounded-lg p-8 max-w-2xl">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Input
            label="Nombre"
            name="name"
            placeholder="Ej: Juan"
            change={handleChange}
          />
          <Input
            label="Apellido"
            name="surName"
            placeholder="Ej: Pérez"
            change={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Input
            label="Usuario"
            name="username"
            placeholder="Ej: juanperez"
            change={handleChange}
          />
          <Input
            label="Correo Electrónico"
            name="email"
            type="email"
            placeholder="Ej: juan@unsis.mx"
            change={handleChange}
          />
        </div>

        {!user && (
          <>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <Input
                label="Contraseña"
                name="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                change={handleChange}
              />
              <Input
                label="Confirmar Contraseña"
                name="confirmPassword"
                type="password"
                placeholder="Repite la contraseña"
                change={handleChange}
              />
            </div>
          </>
        )}

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Rol
          </label>
          <select
            value={form.roleId}
            onChange={(e) => handleChange('roleId', parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 bg-gray-50 p-4 rounded-lg justify-end">
          <Button variant="discard" onClick={handleDiscard} disabled={loading}>
            <Trash2 size={18} /> Cancelar
          </Button>

          <Button variant="save" onClick={handleSave} disabled={loading}>
            <Save size={18} /> {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </div>
    </div>
  );
}
