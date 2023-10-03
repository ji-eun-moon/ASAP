import React from 'react';
import useDailyProvide from 'hooks/api/chart/useDailyProvide';
import LineGradient from 'components/chart/LineGradient';
import useDetailStore from 'store/chart/useDetailStore';

function SupplierDailyChart() {
  const { dailyLoading } = useDailyProvide();
  const { dailyUsageStore } = useDetailStore();

  if (dailyLoading) {
    return null;
  }

  return (
    <div>
      <div>{dailyUsageStore && <LineGradient data={dailyUsageStore} />}</div>
    </div>
  );
}

export default SupplierDailyChart;
