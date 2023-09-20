import useAccountInfo from 'hooks/api/mypage/useAccountInfo';
import React from 'react';
import SideBar from 'components/nav/SideBar';
import Header from 'components/common/Header';
import menus from 'router/mypage-menus';

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
        <div className="col-span-10 border border-black">
          <p className="text-2xl font-bold">가입자 정보</p>
          <br />
          {/* 표 테두리 */}
          <div className="grid grid-cols-12 justify-start items-start">
            {/* 표 왼쪽부분 1 */}
            <div className="col-span-2 flex justify-start items-start">
              아이디
            </div>
            {/* 표 오른쪽부분 1 */}
            <div className="col-span-9 flex justify-start items-start">
              {memberInfo?.name}
            </div>
            {/* 표 왼쪽부분 2 */}
            <div className="col-span-2 flex justify-start items-start">
              이름
            </div>
            {/* 표 오른쪽부분 2 */}
            <div className="col-span-10 flex justify-start items-start">
              양시온온온
            </div>
            {/* 표 왼쪽부분 3 */}
            <div className="col-span-2 flex justify-start items-start">
              이메일
            </div>
            {/* 표 오른쪽부분 3 */}
            <div className="col-span-10 flex justify-start items-start">
              sion941004@naver.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
