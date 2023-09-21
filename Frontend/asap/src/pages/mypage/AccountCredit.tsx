import React from 'react';
import SideBar from 'components/nav/SideBar';
import Header from 'components/common/Header';
import menus from 'router/mypage-menus';

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
          {/* <p className="text-2xl font-bold">가입자 정보</p> */}
          <div className="px-4">
            <div className="flex">
              <p>카드정보</p>
              <p>XX</p>
            </div>
            <div className="flex">
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
