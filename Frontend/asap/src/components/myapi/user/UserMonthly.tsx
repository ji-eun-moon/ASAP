import React from 'react';
import useMonthlyUsage from 'hooks/api/chart/useMonthlyUsage';
import useMonthlyStore from 'store/chart/useMonthlyStore';
import Spinner from 'components/common/Spinner';

function UserMonthly() {
  const { monthlyLoading } = useMonthlyUsage(); // 사용자 월별 api 사용량 받기
  const { monthDate, oneBeforeMonthDate, twoBeforeMonthDate, totalAmount } =
    useMonthlyStore();

  return (
    <div>
      {/* 월별 통계 데이터 받기 - 테스트 */}
      {monthlyLoading ? (
        <Spinner size="12" />
      ) : (
        <div>
          {monthDate} {oneBeforeMonthDate} {twoBeforeMonthDate} {totalAmount}
        </div>
      )}
    </div>
  );
}

export default UserMonthly;
