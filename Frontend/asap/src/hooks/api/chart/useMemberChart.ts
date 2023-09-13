import axios from 'axios';

const useMemberChart = () => {
  const memberChart = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:8000/api/v1/member/use-api',
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
