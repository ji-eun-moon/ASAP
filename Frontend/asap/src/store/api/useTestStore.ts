import { create } from 'zustand';

interface TestState {
  testResponse: string;
  setTestResponse: (testResponse: string) => void; // eslint-disable-line no-unused-vars
  status: number;
  setStatus: (status: number) => void; // eslint-disable-line no-unused-vars
}

const useTestStore = create<TestState>((set) => ({
  testResponse: '',
  status: 200,
  setTestResponse: (testResponse) => set(() => ({ testResponse })),
  setStatus: (status) => set(() => ({ status })),
}));

export default useTestStore;
