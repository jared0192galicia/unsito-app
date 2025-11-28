import { create } from 'zustand';

type State = {
    visits: any[],
    visitsFiltered: any[],
    selectedPeriod: string,
    messages: number,
    visitsToday: number,
    visitsTotal: number,
    operatingDays: number,

    periods: string[],

    setVisits: (v: any[]) => void,
    setVisitsFiltered: (v: any[]) => void,
    setSelectedPeriod: (v: string) => void,
    setMessages: (v: number) => void,
    setVisitsToday: (v: number) => void,
    setVisitsTotal: (v: number) => void,
    setOperatingDays: (v: number) => void,

    filterData: () => void,
};

function formatMonth(date: string) {
    return new Date(date).toLocaleDateString('es-ES', { month: 'short' });
}

const useDashboardStore = create<State>((set, get) => ({
    visits: [],
    visitsFiltered: [],
    selectedPeriod: '',
    messages: 0,
    visitsToday: 0,
    visitsTotal: 0,
    operatingDays: 0,

    periods: ['7 Días', '30 Días', '3 Meses', '6 Meses', '1 Año'],

    setVisits: (value) => set({ visits: value }),
    setVisitsFiltered: (value) => set({ visitsFiltered: value }),
    setSelectedPeriod: (value) => set({ selectedPeriod: value }),
    setMessages: (value) => set({ messages: value }),
    setVisitsToday: (value) => set({ visitsToday: value }),
    setVisitsTotal: (value) => set({ visitsTotal: value }),
    setOperatingDays: (value) => set({ operatingDays: value }),

    filterData: () => {
        const { selectedPeriod, visits, setVisitsFiltered } = get();

        const now = new Date();
        const from = new Date();

        switch (selectedPeriod) {
            case '7 Días':
                from.setDate(now.getDate() - 7);
                break;
            case '30 Días':
                from.setDate(now.getDate() - 30);
                break;
            case '3 Meses':
                from.setMonth(now.getMonth() - 3);
                break;
            case '6 Meses':
                from.setMonth(now.getMonth() - 6);
                break;
            case '1 Año':
                from.setFullYear(now.getFullYear() - 1);
                break;
        }

        const newVisits = visits
            .filter(entry => new Date(entry.date) >= from && new Date(entry.date) <= now)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        console.log('newVisits: ', newVisits);

        const visitsFiltered = newVisits.map(v => ({
            ...v,
            label: formatMonth(v.date),
        }));

        console.log('visitsFiltered: ', visitsFiltered);

        setVisitsFiltered(visitsFiltered);
    }
}));

export default useDashboardStore;