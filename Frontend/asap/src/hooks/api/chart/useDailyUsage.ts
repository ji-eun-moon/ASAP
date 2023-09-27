// 사용자 - 일별 사용량 조회(추가부분)
// 일간 사용량 조회

import axiosInstance from 'utils/axiosInstance';

const useDailyUsage = () => {
  const dailyUsage = async () => {
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
  return { dailyUsage };
};

export default useDailyUsage;
