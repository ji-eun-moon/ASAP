import axiosInstance from 'utils/axiosInstance';

interface paymentInfo {
  cardCompany: string;
  cardNumber: string;
  createAt: string;
  fee: number;
}
const usePayment = () => {
  const payment = async ({
    cardCompany,
    cardNumber,
    createAt,
    fee,
  }: paymentInfo) => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: '/api/v1/payment/approve',
        data: {
          cardCompany,
          cardNumber,
          createAt,
          fee,
        },
      });
      if (response.status === 201) {
        console.log('결제 등록 완료');
      } else {
        console.log('결제 등록 실패');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { payment };
};

export default usePayment;
