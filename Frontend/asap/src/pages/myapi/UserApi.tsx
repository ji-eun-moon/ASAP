import React from 'react';
import useMemberChart from 'hooks/api/chart/useMemberChart';

function UserApi() {
  const { memberChart } = useMemberChart();
  return (
    <div>
      <button
        type="button"
        onClick={memberChart}
        style={{ border: '1px solid' }}
      >
        사용자 통계 가져오기
      </button>
    </div>
  );
}

export default UserApi;
