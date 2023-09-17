import React from 'react';
import useGetApiDetail from 'hooks/api/api/useGetApiDetail';
import useCheckApply from 'hooks/api/api/useCheckApply';

function ApiDetail() {
  const { apiId, getApiDetail } = useGetApiDetail();
  const { checkApply } = useCheckApply();

  return (
    <div>
      apiList
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={() => checkApply(apiId)}
      >
        api 신청 여부 조회 테스트
      </button>
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={() => getApiDetail(apiId)}
      >
        api 상세 조회 테스트
      </button>
    </div>
  );
}

export default ApiDetail;
