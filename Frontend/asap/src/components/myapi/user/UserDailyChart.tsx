import React from 'react';
import useDailyUsage from 'hooks/api/chart/useDailyUsage';
import LineGradient from 'components/chart/LineGradient';
import useDetailStore from 'store/chart/useDetailStore';

function DailyChart() {
  const { dailyLoading } = useDailyUsage();
  const { dailyUsageStore } = useDetailStore();

  if (dailyLoading) {
    return null;
  }

  return (
    <div>{dailyUsageStore && <LineGradient data={dailyUsageStore} />}</div>
  );
}

export default DailyChart;
