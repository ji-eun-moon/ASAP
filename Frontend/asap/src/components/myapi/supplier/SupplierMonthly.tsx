import useMonthlyProvide from 'hooks/api/chart/useMonthlyProvide';
import React from 'react';

/**
 * 제공자 월별 통계
 */

function SupplierMonthly() {
  const { monthlyLoading } = useMonthlyProvide();
  return <div>SupplierMonthly {monthlyLoading}</div>;
}

export default SupplierMonthly;
