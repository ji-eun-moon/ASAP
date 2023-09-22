import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactElement;
}

/**
 * 제공자만 접근 불가능한 라우터
 * @param children 페이지 컴포넌트
 * @returns 제공자일 경우 계정 전환 페이지로 이동
 */

function NoSplRoute({ children }: Props) {
  const { isLoggedIn, loginType } = useAuthStore();
  return isLoggedIn && loginType === 'supplier' ? (
    <Navigate to="/change_account" />
  ) : (
    children
  );
}

export default NoSplRoute;
