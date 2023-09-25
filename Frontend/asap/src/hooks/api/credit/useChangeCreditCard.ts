import axiosInstance from 'utils/axiosInstance';

// 결제수단 변경(카드회사,카드번호)
interface IChangeCard {
  cardCompany: string;
  cardNumber: string;
}

const useChangeCard = () => {
  const changeCreditCard = async ({ cardCompany, cardNumber }: IChangeCard) => {
    try {
      const response = await axiosInstance({
        method: 'PUT',
        url: `/api/v1/credit/update`,
        data: { cardCompany, cardNumber },
      });
      console.log(response.data);
      // 서버에서 받은 응답 처리
      if (response.status === 202) {
        console.log('결제 수단 변경 성공');
        console.log(cardCompany);
        console.log(cardNumber);
      }
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  return { changeCreditCard };
};

export default useChangeCard;
