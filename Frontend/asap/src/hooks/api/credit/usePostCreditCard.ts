import axiosInstance from 'utils/axiosInstance';

interface cardInfo {
  cardCompany: string;
  cardNumber: string;
}

const usePostCreditCard = () => {
  const postCreditCard = async ({ cardCompany, cardNumber }: cardInfo) => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: `/api/v1/credit`,
        data: {
          cardCompany,
          cardNumber,
        },
      });
      if (response.status === 201) {
        console.log('카드 등록 성공');
      } else {
        console.log('카드 등록 실패');
      }
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };
  return { postCreditCard };
};

export default usePostCreditCard;
