import React, { useState } from 'react';
import SideBar from 'components/nav/SideBar';
import Header from 'components/common/Header';
import menus from 'router/data/mypage-menus';
import CreditCardRegistration from 'components/mypage/CreditCardRegistration';
import CardImg from 'assets/images/card.png';
import useGetCreditCard from 'hooks/api/credit/useGetCreditCard';

function AccountCredit() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const { loading, creditCard } = useGetCreditCard();

  const handleButtonClick = () => {
    setIsModal(!isModal);
    if (loading) {
      console.log(loading);
    }
  };
  // 카드 등록 페이지
  return (
    <div>
      <Header title="결제 수단 관리" />
      {/* sidebar */}
      <div className="container mx-auto page-container grid grid-cols-12">
        <div className="col-span-2 flex justify-start items-start ml-8">
          <SideBar menus={menus} />
        </div>
        {/* 오른쪽부분 */}
        <div className="col-span-10 ml-2">
          <p className="text-2xl font-bold mb-4">등록된 카드</p>

          {/* 모달창 */}
          {isModal && (
            <CreditCardRegistration closeModal={() => setIsModal(false)} />
          )}
          <div className="">
            <div className="bg-gray-200 h-44 rounded-lg items-center flex justify-between px-8">
              {/* 카드 이미지 */}
              <div className="h-36 relative font-sans font-normal text-sm">
                <img
                  src={CardImg}
                  alt="card"
                  className="max-w-full max-h-full rounded-2xl"
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-4">
                  <div className="text-white">Credit</div>
                  <div className="flex flex-col items-start">
                    <div className="text-white">
                      {creditCard
                        ? creditCard.cardCompany
                        : '등록된 카드가 없습니다.'}
                    </div>
                    <div className="text-white mt-0.5">
                      {creditCard
                        ? creditCard.cardNumber
                        : '카드를 등록해주세요.'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="font-bold text-xl">
                {creditCard
                  ? `${creditCard.cardCompany} (${
                      creditCard.cardNumber
                        ? creditCard.cardNumber.slice(-4)
                        : ''
                    })`
                  : '등록된 카드가 없습니다.'}
              </div>

              {/* 카드 정보 등록 버튼 */}
              <div
                aria-hidden="true"
                className="rounded text-white py-1.5 px-5 text-md w-36 text-center font-medium cursor-pointer flex items-center justify-center"
                onClick={handleButtonClick}
                style={{ backgroundColor: '#004096' }}
              >
                {creditCard ? '카드정보 변경' : '카드정보 등록'}
              </div>
            </div>
          </div>

          {/* 결제내역 */}
          <p className="text-2xl font-bold mt-12 mb-4">결제 내역</p>
          <div className="text-center text-base font-medium border">
            {/* Header */}
            <div className=" grid grid-cols-12 items-center">
              <div className="col-span-2 bg-blue-300 text-white p-2">
                결제일자
              </div>
              <div className="col-span-2 bg-blue-300 text-white p-2">
                카드사
              </div>
              <div className="col-span-4 bg-blue-300 text-white p-2">
                카드번호
              </div>
              <div className="col-span-2 bg-blue-300 text-white p-2">
                결제금액
              </div>
              <div className="col-span-2 bg-blue-300 text-white p-2">비고</div>
            </div>
            {/* Row */}
            <div className=" grid grid-cols-12 items-center">
              <div className="col-span-2 p-2">2023.09.01</div>
              <div className="col-span-2 p-2">삼성카드</div>
              <div className="col-span-4 p-2">4556 - **** - **** - 5168</div>
              <div className="col-span-2 p-2">127,800</div>
              <div className="col-span-2 p-2 flex justify-center items-center">
                <div className="bg-gray-600 text-white py-1 rounded w-28 cursor-pointer">
                  상세보기
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountCredit;
