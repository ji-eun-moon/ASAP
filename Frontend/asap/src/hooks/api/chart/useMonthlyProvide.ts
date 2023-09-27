// 제공자 - 월별 제공량 비교
// 월간 제공량 조회

import axiosInstance from 'utils/axiosInstance';

const useMonthlyProvide = () => {
  const monthlyProvide = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/apis/usage/monthly',
      });
      console.log('사용자 월별 사용량 조회 성공', response.data);
    } catch (error) {
      console.log('사용자 월별 사용량 조회 실패', error);
    }
  };
  return { monthlyProvide };
};

export default useMonthlyProvide;
