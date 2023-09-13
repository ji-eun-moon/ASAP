import axios from 'axios';

const useSupplierChart = () => {
  const supplierChart = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:8000/api/v1/member/provide-api/analysis',
      });
      if (response.status === 200) {
        console.log('제공자 통계 정보', response.data);
      } else {
        console.error('제공자 통계 정보 가져오기 실패', response.data);
      }
    } catch (error) {
      console.log('서버 오류', error);
    }
  };
  return { supplierChart };
};

export default useSupplierChart;
