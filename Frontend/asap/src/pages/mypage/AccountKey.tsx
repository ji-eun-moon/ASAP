import React from 'react';
import SideBar from 'components/nav/SideBar';
import menus from 'router/mypage-menus';

function AccountKey() {
  return (
    <div className="container mx-auto page-container grid grid-cols-4">
      <div className="col-span-1 flex justify-center items-start">
        <SideBar menus={menus} />
      </div>
      <div className="col-span-3">AccountKey</div>
    </div>
  );
}

export default AccountKey;
