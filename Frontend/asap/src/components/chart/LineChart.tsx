import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as echarts from 'echarts';
import useNewUserStore from 'store/chart/useNewUserStore';
import useNewUser from 'hooks/api/chart/useNewUser';

function LineChart() {
  const chartRef = useRef(null);
  const newUserData = useNewUser();

  const {
    twoBeforeMonthDate,
    oneBeforeMonthDate,
    monthDate,
    twoBeforeMonthCount,
    oneBeforeMonthCount,
    monthCount,
  } = useNewUserStore();

  const dateArr = useMemo(
    () => [twoBeforeMonthDate, oneBeforeMonthDate, monthDate],
    [twoBeforeMonthDate, oneBeforeMonthDate, monthDate],
  );
  const countArr = useMemo(
    () => [twoBeforeMonthCount, oneBeforeMonthCount, monthCount],
    [twoBeforeMonthCount, oneBeforeMonthCount, monthCount],
  );

  const [options] = useState({
    // X축 데이터 포인트 위에 마우스를 가져갈 때 표시
    tooltip: {
      trigger: 'axis',
      // eslint-disable-next-line
      formatter(params: any[]) {
        return `${params[0].name}: ${params[0].value}`; // X축 값 및 데이터 값 표시
      },
    },
    xAxis: {
      type: 'category',
      data: dateArr,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: countArr,
        type: 'line',
      },
    ],
  });

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption(options);
    }
  }, [newUserData, options]);

  return (
    <div
      ref={chartRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
}

export default LineChart;
