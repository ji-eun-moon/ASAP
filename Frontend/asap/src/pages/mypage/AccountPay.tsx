import useDeleteCredit from 'hooks/api/credit/useDeleteCreditCard';
import useGetCreditCard from 'hooks/api/credit/useGetCreditCard';
import usePostCreditCard from 'hooks/api/credit/usePostCreditCard';
import React, { useState, ChangeEvent } from 'react';
import { Input, Button } from '@material-tailwind/react';

function AccountPay() {
  const { deleteCreditCard } = useDeleteCredit();
  const { getCreditCard } = useGetCreditCard();
  const { postCreditCard } = usePostCreditCard();

  // 카드등록 정보 (카드회사, 카드번호)
  const [cardCompany, setCardCompany] = useState<string>(''); // 카드회사
  const [cardNumber, setCardNumber] = useState<string>(''); // 카드번호

  const onCompanyHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCardCompany(event.target.value);
  };

  const onNumberHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCardNumber(event.target.value);
  };

  const onPostCreditCard = async () => {
    await postCreditCard({
      cardCompany,
      cardNumber,
    });
  };

  return (
    <div>
      AccountPay
      <div>
        <button
          type="button"
          style={{ border: '1px solid' }}
          onClick={getCreditCard}
        >
          카드 조회하기 테스트
        </button>
      </div>
      <div>
        <button
          type="button"
          style={{ border: '1px solid' }}
          onClick={deleteCreditCard}
        >
          카드 삭제하기 테스트
        </button>
      </div>
      <div>
        카드 등록하기 테스트
        <div>
          <p>카드회사</p>
          <Input
            label="카드회사"
            value={cardCompany}
            onChange={onCompanyHandler}
            className="pr-20"
            containerProps={{
              className: 'min-w-0',
            }}
            crossOrigin=""
          />
          <Input
            label="카드번호"
            value={cardNumber}
            onChange={onNumberHandler}
            className="pr-20"
            containerProps={{
              className: 'min-w-0',
            }}
            crossOrigin=""
          />
        </div>
        <Button onClick={onPostCreditCard}>카드등록</Button>
      </div>
    </div>
  );
}

export default AccountPay;
