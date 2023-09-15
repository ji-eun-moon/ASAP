import axiosInstance from 'utils/axiosInstance';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface apiItem {
  id: string;
  title: string;
  usage: string;
}

const useGetApiUsage = () => {
  const [apiUsage, setApiUsage] = useState<apiItem[] | null>(null);
  const { apiId } = useParams() as { apiId: string };
  const getApiUsage = async (id: string) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `https://j9c202.p.ssafy.io/api/v1/apis/guide/${id}`, // api 미완성
      });
      setApiUsage(response.data);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  useEffect(() => {
    getApiUsage(apiId);
  }, [apiId]);

  return { getApiUsage, apiId, apiUsage };
};

export default useGetApiUsage;
