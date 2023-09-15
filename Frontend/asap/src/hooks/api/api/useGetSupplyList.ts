import axiosInstance from 'utils/axiosInstance';
import { useState, useEffect } from 'react';

interface IApi {
  id: string;
  title: string;
}

const useGetSupplyList = () => {
  const [supplyList, setSupplyList] = useState<IApi[] | null>(null);
  const getSupplyList = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: 'https://j9c202.p.ssafy.io/api/v1/member/provide-api', // api 수정 필요
      });
      setSupplyList(response.data);
    } catch (error) {
      console.log('서버 오류 :', error);
    }
  };

  useEffect(() => {
    getSupplyList();
  }, []);

  return { getSupplyList, supplyList };
};

export default useGetSupplyList;
