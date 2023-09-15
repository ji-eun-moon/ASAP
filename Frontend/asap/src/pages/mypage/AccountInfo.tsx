import useAccountInfo from 'hooks/api/mypage/useAccountInfo';
import React from 'react';

function AccountInfo() {
  const { getMemberInfo } = useAccountInfo();

  return (
    <div>
      AccountInfo
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={getMemberInfo}
      >
        개인 정보 조회 테스트
      </button>
    </div>
  );
}

export default AccountInfo;
