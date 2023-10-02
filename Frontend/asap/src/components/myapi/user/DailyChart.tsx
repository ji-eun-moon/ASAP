import React from 'react';
import useDailyUsage from 'hooks/api/chart/useDailyUsage';
import LineGradient from 'components/chart/LineGradient';

function DailyChart() {
  const { dailyUsage } = useDailyUsage();
  return <div>{dailyUsage && <LineGradient data={dailyUsage} />}</div>;
}

export default DailyChart;
