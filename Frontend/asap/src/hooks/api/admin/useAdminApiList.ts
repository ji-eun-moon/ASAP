import axiosInstance from 'utils/axiosInstance';
// import { useEffect } from 'react';

const useAdminApiList = () => {
  const adminApiList = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/apply/list',
      });
      if (response.status === 200) {
        console.log('관리자 api 신청 내역 조회');
      } else {
        console.log('관리자 api 신청 내역 조회 실패');
      }
    } catch (error) {
      console.log('서버오류', error);
    }
  };

  // useEffect(() => {
  //   adminApiList();
  // });
  return { adminApiList };
};
export default useAdminApiList;
