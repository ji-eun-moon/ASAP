import { create } from 'zustand';

interface IDetailStore {
  // axios 요청할 apiId
  apiId: number;
  setApiId: (apiId: number) => void; // eslint-disable-line no-unused-vars
}

const useDetailStore = create<IDetailStore>((set) => ({
  apiId: 23,
  setApiId: (apiId: number) => set({ apiId }),
}));

export default useDetailStore;
