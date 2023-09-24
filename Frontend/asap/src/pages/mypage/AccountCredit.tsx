import React, { useState } from 'react';
import SideBar from 'components/nav/SideBar';
import Header from 'components/common/Header';
import menus from 'router/data/mypage-menus';
import CreditCardRegistration from 'components/mypage/CreditCardRegistration';

function AccountPay() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const handleButtonClick = () => {
    setIsModal(!isModal);
  };
  return (
    <div>
      <Header title="결제 수단 관리" />
      {/* sidebar */}
      <div className="container mx-auto page-container grid grid-cols-12">
        <div className="col-span-2 flex justify-start items-start ml-8">
          <SideBar menus={menus} />
        </div>
        {/* 오른쪽부분 */}
        <div className="col-span-10">
          {isModal ? (
            <p className="text-2xl font-bold">카드 등록하기</p>
          ) : (
            <p className="text-2xl font-bold">등록된 카드</p>
          )}

          <div
            aria-hidden="true"
            className="rounded bg-blue-700 text-white py-2 px-5 text-xs w-32 text-center font-bold cursor-pointer"
            onClick={handleButtonClick}
          >
            카드 정보 등록
          </div>
          {/* <p className="text-2xl font-bold">결제 내역</p> */}
          {/* 모달창 */}
          {isModal ? (
            <CreditCardRegistration closeModal={() => setIsModal(false)} />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountPay;
