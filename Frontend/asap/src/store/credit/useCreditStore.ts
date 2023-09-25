import { create } from 'zustand';

type CreditCardState = {
  mode: 'register' | 'update';
  setMode: (mode: 'register' | 'update') => void; // eslint-disable-line no-unused-vars
};

const useCreditCardStore = create<CreditCardState>((set) => ({
  mode: 'register',
  setMode: (mode) => set({ mode }),
}));

export default useCreditCardStore;
