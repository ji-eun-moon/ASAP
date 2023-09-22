import { useEffect, useState } from 'react';
import axiosInstance from 'utils/axiosInstance';
// import { useEffect } from 'react';
interface ApiData {
  applyId: number;
  createDate: string;
  modifyDate: string;
  progress: string;
  title: string;
}

const useAdminApiList = () => {
  const [apis, setApiList] = useState<ApiData[]>([]);
  const [lastChanged, setLastChanged] = useState<number>(0);
  const adminApiList = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/apply/list',
      });
      if (response.status === 200) {
        // console.log('관리자 api 신청 내역 조회');
        // console.log(response.data);
        setApiList(response.data);
      } else {
        console.log('관리자 api 신청 내역 조회 실패');
      }
    } catch (error) {
      console.log('서버오류', error);
    }
  };

  useEffect(() => {
    adminApiList();
  }, [lastChanged]);
  return { apis, setLastChanged };
};
export default useAdminApiList;
