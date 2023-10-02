import axiosInstance from 'utils/axiosInstance';

const usePaymentDetail = () => {
  const paymentDetail = async (paymentId: number) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `/api/v1/payment/detail/${paymentId}`,
      });
      if (response.status === 201) {
        console.log('결제 상세 내역 확인 완료');
      } else {
        console.log('결제 상세 내역 확인 실패');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { paymentDetail };
};

export default usePaymentDetail;
