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
        url: `https://j9c202.p.ssafy.io/api/v1/apis/${id}/check-apply`, // api 미완성
      });
      setApply(response.data);
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
