import { create } from 'zustand';

interface industryRateStore {
  industry: string[];
  count: number[];

  setIndustry: (industry: string[]) => void; // eslint-disable-line no-unused-vars
  setCount: (count: number[]) => void; // eslint-disable-line no-unused-vars
}

const useIndustryRateStore = create<industryRateStore>((set) => ({
  industry: [],
  count: [],

  setIndustry: (industry) => set({ industry }),
  setCount: (count) => set({ count }),
}));
export default useIndustryRateStore;
