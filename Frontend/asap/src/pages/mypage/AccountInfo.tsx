import useAccountInfo from 'hooks/api/mypage/useAccountInfo';
import React from 'react';
import SideBar from 'components/nav/SideBar';
import Header from 'components/common/Header';
import menus from 'router/mypage-menus';

function AccountInfo() {
  const { getMemberInfo } = useAccountInfo();

  return (
    <div>
      <Header title="기본 정보" />
      <div className="container mx-auto page-container grid grid-cols-4">
        <div className="col-span-1 flex justify-start items-start ml-8">
          <SideBar menus={menus} />
        </div>
        <div className="col-span-3">
          AccountInfo
          <button
            type="button"
            style={{ border: '1px solid' }}
            onClick={getMemberInfo}
          >
            개인 정보 조회 테스트
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
