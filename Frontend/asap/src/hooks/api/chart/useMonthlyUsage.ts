// 사용자 - 월별 사용량 비교
// 월간 사용량 조회

import axiosInstance from 'utils/axiosInstance';

interface monthly {
  year: string;
  month: string;
}
const useMonthlyUsage = () => {
  const monthlyUsage = async (paramsObject: monthly) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/apis/usage/monthly',
        params: paramsObject,
      });
      console.log('사용자 월별 사용량 조회 성공', response.data);
    } catch (error) {
      console.log('사용자 월별 사용량 조회 실패', error);
    }
  };
  return { monthlyUsage };
};

export default useMonthlyUsage;
