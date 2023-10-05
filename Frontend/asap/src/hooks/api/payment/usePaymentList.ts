import axiosInstance from 'utils/axiosInstance';

const usePaymentList = () => {
  const paymentList = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/payment/list',
      });
      if (response.status === 200) {
        console.log('결제 내역 확인 완료');
      } else {
        console.log('결제 내역 확인 실패');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { paymentList };
};

export default usePaymentList;
