import axiosInstance from 'utils/axiosInstance';

const useMemberChart = () => {
  const memberChart = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/monthly/usage', // 아직 안만들어짐
      });
      if (response.status === 200) {
        console.log('사용자 통계 정보', response.data);
      } else {
        console.error('사용자 통계 정보 가져오기 실패', response.data);
      }
    } catch (error) {
      console.log('서버 오류', error);
    }
  };
  return { memberChart };
};

export default useMemberChart;
