import React from 'react';
import useLogOut from 'hooks/api/auth/useLogOut';
import { ReactComponent as LogOut } from 'assets/icons/LogOut.svg';
import Switch from './Switch';

function MyPageDrop() {
  const { logOut } = useLogOut();
  return (
    <div>
      {/* 사용자 모드 제공자 모드 토글 */}
      <Switch />
      <button type="button" onClick={logOut} className="flex items-center">
        <p className="text-red-600 font-bold me-1">로그아웃</p>
        <LogOut />
      </button>
    </div>
  );
}

export default MyPageDrop;
