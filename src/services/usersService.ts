import api from './axios';

export interface User {
  id: number;
  name: string;
  surName: string;
  username: string;
  email: string;
  role: {
    id: number;
    name: string;
    description?: string;
  };
  createdAt: string;
}

export interface CreateUserData {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  roleId?: number;
}

/**
 * Obtener todas las cuentas de usuarios
 */
export async function getAllUsers() {
  try {
    const response = await api.get('/auth/users');
    return response.data as User[];
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
}

/**
 * Crear una nueva cuenta
 */
export async function createUser(userData: CreateUserData) {
  try {
    // Si roleId está presente, usar el endpoint de admin, sino usar signup normal
    const endpoint = userData.roleId ? '/admin/users/create' : '/auth/signup';
    const response = await api.post(endpoint, userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
}

/**
 * Eliminar una cuenta
 */
export async function deleteUser(userId: number) {
  try {
    const response = await api.delete(`/auth/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
}
