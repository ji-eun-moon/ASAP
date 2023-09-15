import React from 'react';
import useGetApiUsage from 'hooks/api/api/useGetApiUsage';

function ApiUsage() {
  const { apiId, getApiUsage } = useGetApiUsage();
  return (
    <div>
      apiList
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={() => getApiUsage(apiId)}
      >
        api 사용법 조회 테스트
      </button>
    </div>
  );
}

export default ApiUsage;
