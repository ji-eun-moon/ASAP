import React from 'react';
import useGetSupplyList from 'hooks/api/api/useGetSupplyList';

function ApiSupply() {
  const { getSupplyList } = useGetSupplyList();
  return (
    <div>
      apiList
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={getSupplyList}
      >
        제공 api 리스트 받기 테스트
      </button>
    </div>
  );
}

export default ApiSupply;
