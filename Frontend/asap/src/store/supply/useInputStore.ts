import { create } from 'zustand';

interface Pair {
  idx: number;
  key: string;
  name: string;
  type: string;
  required: string;
  description: string;
}

interface PairStore {
  key: string;
  name: string;
  type: string;
  description: string;
  required: string;
  pairs: Pair[];
  jsonOutput: string;
  setPairs: (pairs: Pair[]) => void; // eslint-disable-line no-unused-vars
  setJsonOutput: (jsonOutput: string) => void; // eslint-disable-line no-unused-vars
  setKey: (key: string) => void; // eslint-disable-line no-unused-vars
  setName: (name: string) => void; // eslint-disable-line no-unused-vars
  setType: (type: string) => void; // eslint-disable-line no-unused-vars
  setDescription: (description: string) => void; // eslint-disable-line no-unused-vars
  toggleRequired: () => void; // eslint-disable-line no-unused-vars
  resetRequired: () => void; // eslint-disable-line no-unused-vars
}

const useInputStore = create<PairStore>((set) => ({
  key: '',
  name: '',
  type: '',
  description: '',
  required: 'false',
  pairs: [],
  jsonOutput: '',
  setPairs: (pairs) => set({ pairs }),
  setKey: (key) => set({ key }),
  setName: (name) => set({ name }),
  setType: (type) => set({ type }),
  toggleRequired: () =>
    set((state) => ({
      required: state.required === 'true' ? 'false' : 'true',
    })),
  resetRequired: () => set(() => ({ required: 'false' })),
  setDescription: (description) => set({ description }),
  setJsonOutput: (jsonOutput) => set({ jsonOutput }),
}));

export default useInputStore;
