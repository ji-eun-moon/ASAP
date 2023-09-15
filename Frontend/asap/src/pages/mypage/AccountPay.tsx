import useDeleteCredit from 'hooks/api/credit/useDeleteCredit';
import React from 'react';

function AccountPay() {
  const { deleteCredit } = useDeleteCredit();

  return (
    <div>
      AccountPay
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={deleteCredit}
      >
        카드 삭제하기 테스트
      </button>
    </div>
  );
}

export default AccountPay;
