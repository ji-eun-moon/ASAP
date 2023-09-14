import { useState } from 'react';
import axiosInstance from 'utils/axiosInstance';

const useCountNotice = () => {
  const [noticeCount, setNoticeCount] = useState<number>(0);

  const getNoticeCount = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/notice/list-count',
      });
      setNoticeCount(response.data);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };
  return { getNoticeCount, noticeCount };
};

export default useCountNotice;
