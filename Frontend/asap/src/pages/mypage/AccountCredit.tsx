import React from 'react';
import SideBar from 'components/nav/SideBar';
import Header from 'components/common/Header';
import menus from 'router/mypage-menus';
import './AccountCredit.scss';
import { ReactComponent as Cross } from 'assets/icons/Cross2.svg';

function AccountPay() {
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
          {/* <p className="text-2xl font-bold">등록된 카드</p> */}
          {/* <p className="text-2xl font-bold">결제 내역</p> */}
          {/* 모달창 */}
          <div className="px-10 py-8 credit-modal border rounded">
            <div className="flex justify-between cross items-center">
              <p className="text-2xl font-bold">카드정보</p>
              <div className="mt-1">
                <Cross />
              </div>
            </div>
            <div className="mt-2 flex border rounded py-4 px-4">
              <p>카드번호</p>
              <p>네모네모</p>
            </div>
            <div className="flex">
              <p>유효 기간</p>
              <p>유효 기간</p>
            </div>
            <div className="flex">
              <p>카드 비밀번호</p>
              <p>카드 비밀번호</p>
            </div>
            <div className="flex">
              <p>주민번호</p>
              <p>주민번호</p>
            </div>
            <div>법인 어쩌고</div>
            <div>법인 어쩌고</div>
            <div>법인 어쩌고</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPay;
