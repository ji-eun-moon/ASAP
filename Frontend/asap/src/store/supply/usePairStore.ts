import { create } from 'zustand';

interface Pair {
  id: number;
  key: string;
  name: string;
  type: string;
  description: string;
}

interface PairStore {
  key: string;
  name: string;
  type: string;
  description: string;
  pairs: Pair[];
  jsonOutput: string;
  setPairs: (pairs: Pair[]) => void; // eslint-disable-line no-unused-vars
  setJsonOutput: (jsonOutput: string) => void; // eslint-disable-line no-unused-vars
  setKey: (key: string) => void; // eslint-disable-line no-unused-vars
  setName: (name: string) => void; // eslint-disable-line no-unused-vars
  setType: (type: string) => void; // eslint-disable-line no-unused-vars
  setDescription: (description: string) => void; // eslint-disable-line no-unused-vars
}

const usePairStore = create<PairStore>((set) => ({
  key: '',
  name: '',
  type: '',
  description: '',
  pairs: [],
  jsonOutput: '',
  setPairs: (pairs) => set({ pairs }),
  setKey: (key) => set({ key }),
  setName: (name) => set({ name }),
  setType: (type) => set({ type }),
  setDescription: (description) => set({ description }),
  setJsonOutput: (jsonOutput) => set({ jsonOutput }),
}));

export default usePairStore;
