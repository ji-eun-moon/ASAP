import { create } from 'zustand';

interface TestState {
  testResponse: string;
  setTestResponse: (testResponse: string) => void; // eslint-disable-line no-unused-vars
  status: number;
  setStatus: (status: number) => void; // eslint-disable-line no-unused-vars
  loading: boolean;
  setLoading: (loading: boolean) => void; // eslint-disable-line no-unused-vars
  trial: number;
  setTrial: (trial: number) => void; // eslint-disable-line no-unused-vars
  decTrial: () => void;
}

const useTestStore = create<TestState>((set) => ({
  testResponse: '',
  status: 200,
  loading: false,
  trial: 100,
  setTestResponse: (testResponse) => set(() => ({ testResponse })),
  setStatus: (status) => set(() => ({ status })),
  setLoading: (loading) => set(() => ({ loading })),
  setTrial: (trial: number) => set(() => ({ trial })),
  decTrial: () => set((state) => ({ trial: state.trial - 1 })),
}));

export default useTestStore;
