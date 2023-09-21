import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactElement;
}

/**
 * 로그인 한 유저만 접근 가능한 라우트 (사용자, 제공자 모두 접근 가능)
 * @param children 페이지 컴포넌트
 * @returns 로그인 안한 상태면 로그인 페이지로 이동
 */

function PrivateRoute({ children }: Props) {
  const { isLoggedIn } = useAuthStore();
  return !isLoggedIn ? <Navigate to="/login" /> : children;
}

export default PrivateRoute;
