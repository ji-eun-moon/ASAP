import axiosInstance from 'utils/axiosInstance';
import { useState, useEffect } from 'react';

interface IApi {
  id: string;
  title: string;
}

const useGetApiList = () => {
  const [apiList, setApiList] = useState<IApi[] | null>(null);

  const getApiList = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: 'https://j9c202.p.ssafy.io/api/v1/apis/all',
      });
      setApiList(response.data);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  useEffect(() => {
    getApiList();
  }, []);

  return { getApiList, apiList };
};

export default useGetApiList;
