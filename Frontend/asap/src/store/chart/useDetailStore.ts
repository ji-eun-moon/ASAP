import { create } from 'zustand';

interface IDailyUsage {
  date: string;
  amount: number;
  price: number;
}

interface IDetailStore {
  // axios 요청할 apiId
  apiId: number;
  dailyUsageStore: IDailyUsage[] | null;
  setDailyUsageStore: (dailyUsageStore: IDailyUsage[]) => void; // eslint-disable-line no-unused-vars
  setApiId: (apiId: number) => void; // eslint-disable-line no-unused-vars
}

const useDetailStore = create<IDetailStore>((set) => ({
  apiId: 23,
  dailyUsageStore: null,
  setApiId: (apiId: number) => set({ apiId }),
  setDailyUsageStore: (dailyUsageStore: IDailyUsage[]) =>
    set({ dailyUsageStore }),
}));

export default useDetailStore;
