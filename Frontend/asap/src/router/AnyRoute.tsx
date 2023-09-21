import React from 'react';

interface Props {
  children: React.ReactElement;
}

/**
 * 모든 유저 전부 접근 가능
 * @param children 페이지 컴포넌트
 * @returns
 */

function AnyRoute({ children }: Props) {
  return children;
}

export default AnyRoute;
