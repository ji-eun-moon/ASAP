import { create } from 'zustand';

interface ISupplyStore {
  title: string;
  content: string;
  input: string;
  output: string;
  price: number;
  api: string;
  tag: string;
  tags: string[];
  provideDate: Date;
  method: string;
  setTitle: (title: string) => void; // eslint-disable-line no-unused-vars
  setContent: (content: string) => void; // eslint-disable-line no-unused-vars
  setInput: (input: string) => void; // eslint-disable-line no-unused-vars
  setOutput: (output: string) => void; // eslint-disable-line no-unused-vars
  setPrice: (price: number) => void; // eslint-disable-line no-unused-vars
  setApi: (api: string) => void; // eslint-disable-line no-unused-vars
  setTag: (tag: string) => void; // eslint-disable-line no-unused-vars
  setTags: (tag: string) => void; // eslint-disable-line no-unused-vars
  setProvideDate: (provideDate: Date) => void; // eslint-disable-line no-unused-vars
  setMethod: (method: string) => void; // eslint-disable-line no-unused-vars
}

const useSupplyStore = create<ISupplyStore>((set) => ({
  title: '',
  content: '',
  input: '',
  output: '',
  price: 0,
  api: '',
  tag: '',
  tags: [],
  provideDate: new Date(),
  method: '',
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setInput: (input) => set({ input }),
  setOutput: (output) => set({ output }),
  setPrice: (price) => set({ price }),
  setApi: (api) => set({ api }),
  setTag: (tag) => set({ tag }),
  setTags: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  setProvideDate: (provideDate) => set({ provideDate }),
  setMethod: (method) => set({ method }),
}));

export default useSupplyStore;
