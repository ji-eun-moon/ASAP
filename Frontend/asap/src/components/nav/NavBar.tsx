import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import SupplierNav from './SupplierNav';
import PublicNav from './PublicNav';

function NavBar() {
  const { isLoggedIn, loginType } = useAuthStore((state) => state);

  if (isLoggedIn && loginType === 'supplier') {
    return <SupplierNav />;
  }

  if (!isLoggedIn || loginType === 'user') {
    return <PublicNav />;
  }

  // 관리자일 때 조건 추가 필요
  return null;
}

export default NavBar;
