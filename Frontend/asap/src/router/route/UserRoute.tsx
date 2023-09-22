import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactElement;
}

/**
 * 사용자만 접근 가능한 라우터
 * @param children 페이지 컴포넌트
 * @returns 사용자가 아닐 경우 계정 전환 페이지로 이동
 */

function UserRoute({ children }: Props) {
  const { isLoggedIn, loginType } = useAuthStore();
  return isLoggedIn && loginType === 'user' ? (
    children
  ) : (
    <Navigate to="/change_account" />
  );
}

export default UserRoute;
