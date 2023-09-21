import { useState, useEffect } from 'react';
import axiosInstance from 'utils/axiosInstance';

interface INotice {
  noticeId: number;
  title: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

const useNoticeList = () => {
  const [loading, setLoading] = useState(true);
  const [noticeList, setNoticeList] = useState<INotice[] | null>(null);

  const getNoticeList = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/notice/list',
      });
      console.log(response.data);
      setNoticeList(response.data);
      setLoading(false);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  useEffect(() => {
    getNoticeList();
  }, []);

  return { getNoticeList, loading, noticeList };
};

export default useNoticeList;
