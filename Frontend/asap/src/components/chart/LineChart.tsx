import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';

function LineChart() {
  const chartRef = useRef(null);
  const [options] = useState({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
    // X축 데이터 포인트 위에 마우스를 가져갈 때 표시
    tooltip: {
      trigger: 'axis',
      // eslint-disable-next-line
      formatter(params: any[]) {
        return `${params[0].name}: ${params[0].value}`; // X축 값 및 데이터 값 표시
      },
    },
  });

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      chart.setOption(options);
    }
  }, [options, chartRef]);

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
