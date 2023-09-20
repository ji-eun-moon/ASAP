import axiosInstance from 'utils/axiosInstance';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface IApi {
  id: string;
  title: string;
}

const useGetApiDetail = () => {
  const [apiDetail, setApiDetail] = useState<IApi | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { apiId } = useParams() as { apiId: string };
  const getApiDetail = async (id: string) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `/api/v1/apis/detail/${id}`,
      });
      setApiDetail(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  useEffect(() => {
    getApiDetail(apiId);
  }, [apiId]);

  return { apiDetail, getApiDetail, apiId, loading };
};

export default useGetApiDetail;
