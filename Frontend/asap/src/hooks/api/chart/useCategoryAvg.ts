// 제공자 - 동일 카테고리 비교
// 카테고리 평균 조회

import axiosInstance from 'utils/axiosInstance';

const useCategoryAvg = () => {
  const categoryAvg = async () => {
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
  return { categoryAvg };
};

export default useCategoryAvg;
