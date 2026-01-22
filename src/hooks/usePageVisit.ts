import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { serverAPI } from '@models/connection';

/**
 * Hook para registrar visitas a páginas
 * Excluye automáticamente páginas de /admin
 */
export const usePageVisit = () => {
  const pathname = usePathname();

  useEffect(() => {
    // No registrar visitas en páginas de admin
    if (pathname?.startsWith('/admin')) {
      return;
    }

    // Registrar la visita
    const recordVisit = async () => {
      try {
        await axios.post(`${serverAPI}/visits`, {
          page: pathname || '/'
        });
      } catch (error) {
        // Silenciosamente fallar si no se puede registrar la visita
        console.error('Error recording page visit:', error);
      }
    };

    recordVisit();
  }, [pathname]);
};
