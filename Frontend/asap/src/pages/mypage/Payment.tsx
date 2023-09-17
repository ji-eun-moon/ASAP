import React from 'react';
import usePayment from 'hooks/api/payment/usePayment';
import usePaymentList from 'hooks/api/payment/usePaymentList';
import usePaymentDetail from 'hooks/api/payment/usePaymentDetail';
import { Button } from '@material-tailwind/react';

function ApiApproval() {
  const { payment } = usePayment();
  const { paymentList } = usePaymentList();
  const { paymentDetail } = usePaymentDetail();

  const setPayment = async () => {
    await payment({
      cardCompany: '농협',
      cardNumber: '123',
      createAt: '2023-09-15T06:16:48.539Z',
      fee: 0,
    });
  };
  return (
    <div>
      <h1>API 신청내역</h1>
      <Button onClick={setPayment}>결제하기</Button>

      <Button onClick={paymentList}>결제 내역 확인하기</Button>

      <Button onClick={() => paymentDetail(1)}>결제 상세 내역 확인하기</Button>
    </div>
  );
}

export default ApiApproval;
