import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactElement;
}

/**
 * 제공자만 접근 가능한 라우터
 * @param children 페이지 컴포넌트
 * @returns 제공자가 아닐 경우 계정 전환 페이지로 이동
 */

function SupplierRoute({ children }: Props) {
  const { isLoggedIn, loginType } = useAuthStore();
  return isLoggedIn && loginType === 'supplier' ? (
    children
  ) : (
    <Navigate to="/change_account" />
  );
}

export default SupplierRoute;
