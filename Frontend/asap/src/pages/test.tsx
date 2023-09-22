import Table from 'components/mypage/InfoTable';
import React from 'react';

function Test() {
  return (
    <div className="text-3xl">
      테스트페이지입니다.
      <Table left="안녕" right="하세요" height="55px" />
    </div>
  );
}

export default Test;
