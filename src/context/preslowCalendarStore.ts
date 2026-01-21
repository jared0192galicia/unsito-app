import api from '@/services/magicFetch';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';

export interface DayType {
  id: number;
  name: string;
  descripcion?: string;
  colorFondo: string;
  colorFondoDialogo: string;
  colorTexto: string;
}

export interface HoliDay {
  date: string;
  type: DayType;
  name: string;
  source: string;
  description?: string;
  isDashed?: boolean;
}
type InvoiceStore = {
  holidays: HoliDay[];
  setHolidays: (holiDays: HoliDay[]) => void;
  fetchCalendar: () => Promise<void>;
};

export const useCalendarStorage = create<InvoiceStore>((set) => ({
  holidays: [],
  setHolidays(holiDays: HoliDay[]) {
    set({ holidays: holiDays });
  },
  async fetchCalendar() {
    try {
      const response: AxiosResponse = await api.site.getCalendar();
      set({ holidays: response.data });
    } catch (error) {
      console.log(error);
    }
  }
}));
