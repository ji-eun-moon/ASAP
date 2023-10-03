import React from 'react';
import useDailyProvide from 'hooks/api/chart/useDailyProvide';
import LineGradient from 'components/chart/LineGradient';
import useDetailStore from 'store/chart/useDetailStore';

function DailyChart() {
  const { dailyLoading } = useDailyProvide();
  const { dailyUsageStore, apiTitle } = useDetailStore();

  if (dailyLoading) {
    return null;
  }

  return (
    <div>
      <div className="font-bold text-3xl mb-12">
        <span className="ms-20">&apos;{apiTitle}&apos;</span> <span>조회</span>
      </div>
      {dailyUsageStore && <LineGradient data={dailyUsageStore} />}
    </div>
  );
}

export default DailyChart;
