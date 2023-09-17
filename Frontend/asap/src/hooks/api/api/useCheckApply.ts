import axiosInstance from 'utils/axiosInstance';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const useCheckApply = () => {
  const [apply, setApply] = useState<boolean>(false);
  const { apiId } = useParams() as { apiId: string };
  const checkApply = async (id: string) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `/api/v1/purpose/check-apply/${id}`,
      });
      setApply(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  useEffect(() => {
    checkApply(apiId);
  }, [apiId]);

  return { apply, checkApply };
};

export default useCheckApply;
