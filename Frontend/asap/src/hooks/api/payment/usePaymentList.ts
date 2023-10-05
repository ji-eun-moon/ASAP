import { useState, useEffect } from 'react';
import axiosInstance from 'utils/axiosInstance';

interface IPayInfo {
  price: number;
  cardNumber: string;
  cardCompany: string;
  payDate: string;
}

const usePaymentList = () => {
  const [paymentListLoading, setPaymentListLoading] = useState<boolean>(true);
  const [paymentList, setPaymentList] = useState<IPayInfo[] | null>();

  const getPaymentList = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/payment/list',
      });
      if (response.status === 200) {
        console.log('결제 내역 확인 완료', response.data);
        setPaymentList(response.data);
        setPaymentListLoading(false);
      } else {
        console.log('결제 내역 확인 실패');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentList();
  }, []);

  return { paymentList, paymentListLoading, getPaymentList };
};

export default usePaymentList;
