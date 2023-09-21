import useAccountInfo from 'hooks/api/mypage/useAccountInfo';
import React from 'react';
import SideBar from 'components/nav/SideBar';
import Header from 'components/common/Header';
import menus from 'router/mypage-menus';
import Table from 'components/mypage/InfoTable';

// mypage - 기본정보 페이지
function AccountInfo() {
  const { memberInfo } = useAccountInfo();
  // const { getMemberInfo, memberInfo } = useAccountInfo();

  return (
    <div>
      <Header title="기본 정보" />
      {/* sidebar */}
      <div className="container mx-auto page-container grid grid-cols-12">
        <div className="col-span-2 flex justify-start items-start ml-8">
          <SideBar menus={menus} />
        </div>
        {/* 기본정보 메인 */}
        <div className="col-span-10">
          <p className="text-2xl font-bold">가입자 정보</p>
          <br />
          {/* 표 테두리 */}
          <div className="border-2">
            <Table left="아이디" right={memberInfo?.id} />
            <hr />
            <Table left="이름" right={memberInfo?.name} />
            <hr />
            <Table left="이메일" right={memberInfo?.email} />
          </div>
          {/* 수정,탈퇴 flex div */}
          <div className="flex justify-end mt-4">
            <div className="ml-4 border-blue-800 border rounded text-blue-800 py-2 px-5 text-xs">
              회원정보수정
            </div>
            <div className="ml-4 border-red-600 border rounded text-red-600 py-2 px-7 text-xs">
              회원탈퇴
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
