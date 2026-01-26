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

export const useNavbarStore = create<NavBarStore>((set, get) => ({
  active: 'Inicio',

  links: [
    { name: 'Inicio', path: '/' },
    { name: 'Noticias', path: '/noticias' },
    { name: 'Eventos', path: '#' },
    { name: 'Calendario', path: '/calendario' },
  ],

  setActive: (name: string) => set({ active: name }),

  getActive: () => get().active,
}));
