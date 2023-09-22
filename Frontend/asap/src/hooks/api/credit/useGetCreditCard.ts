import { useState, useEffect } from 'react';
import axiosInstance from 'utils/axiosInstance';
// 카드회사, 카드번호 조회
interface INotice {
  cardCompany: string;
  cardNumber: string;
}

const useGetCreditCard = () => {
  const [loading, setLoading] = useState(true);
  const [creditCard, setCreditCard] = useState<INotice[] | null>(null);

  const getCreditCard = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/credit',
      });
      setCreditCard(response.data);
      setLoading(false);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  useEffect(() => {
    getCreditCard();
  }, []);

  return { getCreditCard, loading, creditCard };
};

export default useGetCreditCard;
