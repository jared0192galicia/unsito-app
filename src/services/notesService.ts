import api from './axios';

export interface Author {
  id: number;
  name: string;
  surName: string;
  username: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface PostCategory {
  postId: number;
  categoryId: number;
  category: Category;
}

export interface File {
  id: number;
  filename: string;
  path: string;
  mimeType?: string;
  size?: number;
  uploadedAt?: string;
  altText?: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  description: string;
  createdAt: string;
  author: Author;
  banner?: File;
  contentType: string;
  categories: PostCategory[];
  galleryImages: File[];
  attachment?: File;
  eventDateStart?: string;
  eventDateEnd?: string;
  isFeatured: boolean;
}

/**
 * Obtener todas las noticias/posts
 */
export async function getAllNotes() {
  try {
    const response = await api.get('site/notes');
    return response.data as Post[];
  } catch (error) {
    console.error('Error al obtener las noticias:', error);
    throw error;
  }
}

/**
 * Obtener una noticia por ID
 */
export async function getNoteById(id: number) {
  try {
    const response = await api.get(`site/notes/${id}`);
    return response.data as Post;
  } catch (error) {
    console.error(`Error al obtener la noticia ${id}:`, error);
    throw error;
  }
}

/**
 * Obtener todas las categorías
 */
export async function getAllCategories() {
  try {
    const response = await api.get('site/tags');
    return response.data as Category[];
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    throw error;
  }
}

/**
 * Obtener noticias por categoría
 */
export async function getNotesByCategory(categoryId: number) {
  try {
    const response = await api.get(`site/tags/${categoryId}/notes`);
    return response.data as Post[];
  } catch (error) {
    console.error(`Error al obtener noticias de la categoría ${categoryId}:`, error);
    throw error;
  }
}

/**
 * Obtener noticias destacadas
 */
export async function getFeaturedNotes() {
  try {
    const allNotes = await getAllNotes();
    return allNotes.filter(note => note.isFeatured);
  } catch (error) {
    console.error('Error al obtener noticias destacadas:', error);
    throw error;
  }
}
