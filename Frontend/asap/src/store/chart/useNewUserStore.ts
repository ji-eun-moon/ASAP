import { create } from 'zustand';

interface newUserStore {
  twoBeforeMonthDate: string;
  oneBeforeMonthDate: string;
  monthDate: string;
  twoBeforeMonthCount: number;
  oneBeforeMonthCount: number;
  monthCount: number;

  setTwoBeforeMonthDate: (monthDate: string) => void; // eslint-disable-line no-unused-vars
  setOneBeforeMonthDate: (monthDate: string) => void; // eslint-disable-line no-unused-vars
  setMonthDate: (monthDate: string) => void; // eslint-disable-line no-unused-vars
  setTwoBeforeMonthCount: (monthCount: number) => void; // eslint-disable-line no-unused-vars
  setOneBeforeMonthCount: (monthCount: number) => void; // eslint-disable-line no-unused-vars
  setMonthCount: (monthCount: number) => void; // eslint-disable-line no-unused-vars
}
const useNewUserStore = create<newUserStore>((set) => ({
  twoBeforeMonthDate: '',
  oneBeforeMonthDate: '',
  monthDate: '',
  twoBeforeMonthCount: 0,
  oneBeforeMonthCount: 0,
  monthCount: 0,

  setTwoBeforeMonthDate: (monthDate: string) =>
    set({ twoBeforeMonthDate: monthDate }),
  setOneBeforeMonthDate: (monthDate: string) =>
    set({ oneBeforeMonthDate: monthDate }),
  setMonthDate: (monthDate: string) => set({ monthDate }),
  setTwoBeforeMonthCount: (monthCount: number) =>
    set({ twoBeforeMonthCount: monthCount }),
  setOneBeforeMonthCount: (monthCount: number) =>
    set({ oneBeforeMonthCount: monthCount }),
  setMonthCount: (monthCount: number) => set({ monthCount }),
}));

export default useNewUserStore;
