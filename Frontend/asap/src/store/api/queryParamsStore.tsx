import { create } from 'zustand';

interface QueryParamsState {
  params: Record<string, string>;
  setParam: (key: string, value: string) => void; // eslint-disable-line no-unused-vars
}

const useQueryParamsStore = create<QueryParamsState>((set) => ({
  params: { test: 'asap' },
  setParam: (key, value) =>
    set((state) => ({ params: { ...state.params, [key]: value } })),
}));

export default useQueryParamsStore;
