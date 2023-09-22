import React from 'react';
import SideBar from 'components/nav/SideBar';
import Header from 'components/common/Header';
import menus from 'router/data/mypage-menus';
import './AccountKey.scss';
import { ReactComponent as Copy } from 'assets/icons/copybutton.svg';

function AccountKey() {
  return (
    <div>
      {/* 헤더 */}
      <Header title="키 관리" />
      <div className="container mx-auto page-container grid grid-cols-12">
        {/* 죄측 사이드바 */}
        <div className="col-span-2 flex justify-start items-start ml-8">
          <SideBar menus={menus} />
        </div>
        {/* 우측 publickey */}
        <div className="col-span-10 text-2xl font-bold">
          <div>public_key</div>
          <div className="mt-4 py-2 pl-3 pr-1 border-black rounded border outer flex">
            {/* 안쪽 회색박스 */}
            <div className="rounded bg-gray-300 inner text-base font-medium flex items-center">
              <p className="ml-2">key는이거입니다.</p>
            </div>
            {/* copy icon */}
            <div className="iconbox ml-2">
              <Copy />
            </div>
          </div>
          {/* 아래 text */}
          <div className="mt-4 text-sm text-gray-600 font-medium">
            ※ API key가 노출되면 계정에 예상치 못한 청구나 할당량 변경과 같은
            상황이 발생할 수 있습니다.
          </div>
          <div className="mt-1 text-sm text-gray-600 font-medium">
            ※ API key 노출로 인한 문제에 대해서는 사용자에게 책임이 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountKey;
