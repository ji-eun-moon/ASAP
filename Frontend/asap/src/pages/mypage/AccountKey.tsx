import React from 'react';
import SideBar from 'components/nav/SideBar';
import Header from 'components/common/Header';
import menus from 'router/data/mypage-menus';

function AccountKey() {
  return (
    <div>
      <Header title="키 관리" />
      <div className="container mx-auto page-container grid grid-cols-4">
        <div className="col-span-1 flex justify-center items-start">
          <SideBar menus={menus} />
        </div>
        <div className="col-span-3">AccountKey</div>
      </div>
    </div>
  );
}

export default AccountKey;
