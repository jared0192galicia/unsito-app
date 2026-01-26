import { create } from 'zustand';

interface Page {
  name: string;
  path: string;
}

type NavBarStore = {
  active: string;
  links: Page[];
  setActive: (name: string) => void;
  getActive: () => string;
};

export const useAdminNavbarStore = create<NavBarStore>((set, get) => ({
  active: 'Inicio',

  links: [
    { name: 'Inicio', path: '/admin/home' },
    { name: 'Publicaciones', path: '/admin/noticias' },
    { name: 'Cuentas', path: '/admin/cuentas' },
    { name: 'Calendario', path: '/admin/calendario' },
  ],

  setActive: (name: string) => set({ active: name }),

  getActive: () => get().active,
}));
