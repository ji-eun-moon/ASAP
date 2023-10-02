import axiosInstance from 'utils/axiosInstance';

const useSupplierChart = () => {
  const supplierChart = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/monthly/provided',
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
