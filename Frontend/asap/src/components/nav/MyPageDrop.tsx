import React from 'react';
import useLogOut from 'hooks/api/auth/useLogOut';
import { ReactComponent as LogOut } from 'assets/icons/LogOut.svg';
import 'styles/common/Button.scss';

function MyPageDrop() {
  const { logOut } = useLogOut();
  return (
    <div>
      <button type="button" onClick={logOut} className="flex items-center">
        <p className="text-red-600 font-bold me-1">로그아웃</p>
        <LogOut />
      </button>
    </div>
  );
}

export default MyPageDrop;
