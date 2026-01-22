import { create } from 'zustand';

export type NotificationType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'reminder';

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  description?: string;
  duration?: number | null; // ms, null/undefined => persistent
  createdAt: number;
};

type UseNotificationStore = {
  items: Notification[];
  push: (n: Omit<Notification, 'id' | 'createdAt'>) => string;
  remove: (id: string) => void;
  clearAll: () => void;
};

const makeId = () =>
  `notif_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

export const useNotificationStore = create<UseNotificationStore>((set) => ({
  items: [],
  push: (n) => {
    const id = makeId();
    const createdAt = Date.now();
    set((s) => ({ items: [{ id, createdAt, ...n }, ...s.items] }));
    return id;
  },
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  clearAll: () => set({ items: [] })
}));
