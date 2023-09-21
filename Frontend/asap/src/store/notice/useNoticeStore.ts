import { create } from 'zustand';

interface INotice {
  noticeId: number;
  title: string;
  content: string;
  read: boolean;
  createDate: string;
}

interface NoticeStore {
  noticeListStore: INotice[];
  setNoticeListStore: (noticeList: INotice[]) => void; // eslint-disable-line no-unused-vars
}

const useNoticeStore = create<NoticeStore>((set) => ({
  noticeListStore: [],
  setNoticeListStore: (noticeListStore: INotice[]) => set({ noticeListStore }),
}));

export default useNoticeStore;
