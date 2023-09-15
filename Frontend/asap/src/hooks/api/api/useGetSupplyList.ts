import axios from 'axios';
import { useState, useEffect } from 'react';

interface IApi {
  id: string;
  title: string;
}

const useGetSupplyList = () => {
  const [supplyList, setSupplyList] = useState<IApi[] | null>(null);
  const getSupplyList = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://j9c202.p.ssafy.io/api/v1/member/provide-api', // api 수정 필요
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6InNvbmciLCJpYXQiOjE2OTQ2NTQ4NjcsImV4cCI6MTY5NDY1NDk1NH0.tJH1m3yEVxc8GZ_9DYCbA1uStI11c44YKP-DvsTZfFLYXH33nyYQGZef__9X_CoRAGoamakRNsbtzUKH3jtMuQ',
        },
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
