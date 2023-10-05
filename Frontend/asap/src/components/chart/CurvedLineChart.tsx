import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

function CurvedLineChart() {
  const chartRef = useRef(null);

  const [options] = useState({
    legend: {
      orient: 'horizontal',
      // align: 'center',
      bottom: 20,
    },
    tooltip: {
      trigger: 'axis',
      showContent: false,
    },
    dataset: {
      source: [
        ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
        ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
        ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
      ],
    },
    xAxis: { type: 'category', boundaryGap: false },
    yAxis: { gridIndex: 0, position: 'center' },
    grid: { top: '20%', bottom: '20%' },
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' },
        color: '#5470C6',
        areaStyle: { opacity: 0.5, color: '#5470C6' },
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' },
        color: '#EE6666',
        areaStyle: { opacity: 0.5, color: '#EE6666' },
      },
    ],
  });

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption(options);
    }
  }, [options]);

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

export default CurvedLineChart;
