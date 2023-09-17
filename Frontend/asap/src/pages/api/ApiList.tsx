import React from 'react';
import useGetApiList from 'hooks/api/api/useGetApiList';

function ApiList() {
  const { getApiList } = useGetApiList();
  return (
    <div>
      apiList
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={getApiList}
      >
        api 리스트 받기 테스트
      </button>
    </div>
  );
}

export default ApiList;
