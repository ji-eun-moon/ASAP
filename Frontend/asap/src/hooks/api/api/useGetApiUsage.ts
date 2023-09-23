import axiosInstance from 'utils/axiosInstance';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface apiItem {
  title: string;
  api: string;
  input: string;
  inputExample: string;
  output: string;
  outputExample: string;
}

const useGetApiUsage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [apiUsage, setApiUsage] = useState<apiItem>();
  const { apiId } = useParams() as { apiId: string };
  const getApiUsage = async (id: string) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `/api/v1/apis/guide/${id}`,
      });
      setApiUsage(response.data);
      setLoading(true);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  useEffect(() => {
    getApiUsage(apiId);
  }, [apiId]);

  return { getApiUsage, apiId, apiUsage, loading };
};

export default useGetApiUsage;
