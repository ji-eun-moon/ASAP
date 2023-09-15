import { useState, useEffect } from 'react';
import axios from 'axios';

interface IApi {
  id: string;
  title: string;
}

const useGetApiList = () => {
  const [apiList, setApiList] = useState<IApi[] | null>(null);

  const getApiList = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://j9c202.p.ssafy.io/api/v1/apis/all',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6InNvbmciLCJpYXQiOjE2OTQ2NzczNDIsImV4cCI6MTY5NDc2Mzc0Mn0.PLsPtzVvcXpAv_ETkPIImnh-3CbEEKdU4OuWjbwOgous2fnnRYUS7cL4fcy4ECukqKJYdtxpOJ5im2tYpEpUZw',
        },
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
