import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import api from '@/services/magicFetch';

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
        await api.visits.post({body: {page: pathname || '/'} });
      } catch (error) {
        // Silenciosamente fallar si no se puede registrar la visita
        console.error('Error recording page visit:', error);
      }
    };

    recordVisit();
  }, [pathname]);
};
