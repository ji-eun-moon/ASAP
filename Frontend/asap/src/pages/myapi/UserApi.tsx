import React from 'react';
<<<<<<< HEAD
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
=======
import UserDetail from 'components/myapi/user/UserDetail';
import UserMonthly from 'components/myapi/user/UserMonthly';

function UserApi() {
  return (
    <div>
      {/* 월별 사용량 통계 */}
      <UserMonthly />
      {/* api별 상세 통계 */}
      <UserDetail />
>>>>>>> bdae4cd19b3e5e9747f97ac5a13eb2d4223c9cc0
    </div>
  );
}

export default UserApi;
