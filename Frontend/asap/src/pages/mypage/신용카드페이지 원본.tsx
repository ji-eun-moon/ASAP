import useDeleteCredit from 'hooks/api/credit/useDeleteCreditCard';
import useGetCreditCard from 'hooks/api/credit/useGetCreditCard';
import usePostCreditCard from 'hooks/api/credit/usePostCreditCard';
import useChangeCard from 'hooks/api/credit/useChangeCreditCard';
import React, { useState, ChangeEvent } from 'react';
import { Input, Button } from '@material-tailwind/react';
import SideBar from 'components/nav/SideBar';
import Header from 'components/common/Header';
import menus from 'router/mypage-menus';

function AccountPay() {
  const { deleteCreditCard } = useDeleteCredit();
  const { getCreditCard } = useGetCreditCard();
  const { postCreditCard } = usePostCreditCard();
  const { changeCreditCard } = useChangeCard();

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
  const onChangeCreditCard = async () => {
    await changeCreditCard({
      cardCompany,
      cardNumber,
    });
  };

  return (
    <div>
      <Header title="결제 수단 관리" />
      <div className="container mx-auto page-container grid grid-cols-4">
        <div className="col-span-1 flex justify-start items-start ml-8">
          <SideBar menus={menus} />
        </div>
        <div className="col-span-3">
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
              <Input
                label="등록할 카드회사"
                value={cardCompany}
                onChange={onCompanyHandler}
                className="pr-20"
                containerProps={{
                  className: 'min-w-0',
                }}
                crossOrigin=""
              />
              <Input
                label="등록할 카드번호"
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
          <div>
            카드 변경하기 테스트
            <div>
              <Input
                label="등록할 카드회사"
                value={cardCompany}
                onChange={onCompanyHandler}
                className="pr-20"
                containerProps={{
                  className: 'min-w-0',
                }}
                crossOrigin=""
              />
              <Input
                label="등록할 카드번호"
                value={cardNumber}
                onChange={onNumberHandler}
                className="pr-20"
                containerProps={{
                  className: 'min-w-0',
                }}
                crossOrigin=""
              />
            </div>
            <Button onClick={onChangeCreditCard}>카드변경</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPay;
