import useWalletInfo from 'hooks/api/wallet/useWalletInfo';
import React from 'react';

function WalletInfo() {
  const { getWalletInfo } = useWalletInfo();
  return (
    <div>
      WalletInfo
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={getWalletInfo}
      >
        지갑 잔고 조회 테스트
      </button>
    </div>
  );
}

export default WalletInfo;
