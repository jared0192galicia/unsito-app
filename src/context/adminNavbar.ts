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
    { name: 'Inicio', path: '/home' },
    { name: 'Publicaciones', path: '/noticias' },
    { name: 'Cuentas', path: '/cuentas' },
    { name: 'Calendario', path: '/calendario' },
  ],

  setActive: (name: string) => set({ active: name }),

  getActive: () => get().active,
}));
