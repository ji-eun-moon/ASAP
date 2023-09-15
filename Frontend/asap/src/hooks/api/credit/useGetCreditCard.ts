import { useState, useEffect } from 'react';
import axiosInstance from 'utils/axiosInstance';

interface INotice {
  cardCompany: string;
  cardNumber: string;
}

const useGetCreditCard = () => {
  const [loading, setLoading] = useState(true);
  const [creditCard, setCreditCard] = useState<INotice[] | null>(null);

  const getCreditCard = async () => {
    console.log('조회하기');
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/credit',
      });
      console.log(response.data);
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
