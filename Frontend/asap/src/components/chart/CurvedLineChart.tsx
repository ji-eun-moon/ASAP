// import React, { useEffect, useRef, useState } from 'react';
// import * as echarts from 'echarts';

// function CurvedLineChart() {
//   const chartRef = useRef(null);

//   const [options] = useState({
//     legend: {
//       orient: 'horizontal',
//       // align: 'center',
//       bottom: 20,
//     },
//     tooltip: {
//       trigger: 'axis',
//       showContent: false,
//     },
//     dataset: {
//       source: [
//         ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
//         ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
//         ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
//       ],
//     },
//     xAxis: { type: 'category', boundaryGap: false },
//     yAxis: { gridIndex: 0, position: 'center' },
//     grid: { top: '20%', bottom: '20%' },
//     series: [
//       {
//         type: 'line',
//         smooth: true,
//         seriesLayoutBy: 'row',
//         emphasis: { focus: 'series' },
//         color: '#5470C6',
//         areaStyle: { opacity: 0.5, color: '#5470C6' },
//       },
//       {
//         type: 'line',
//         smooth: true,
//         seriesLayoutBy: 'row',
//         emphasis: { focus: 'series' },
//         color: '#EE6666',
//         areaStyle: { opacity: 0.5, color: '#EE6666' },
//       },
//     ],
//   });

//   useEffect(() => {
//     if (chartRef.current) {
//       const chart = echarts.init(chartRef.current);
//       chart.setOption(options);
//     }
//   }, [options]);

//   return (
//     <div
//       ref={chartRef}
//       style={{
//         width: '100%',
//         height: '100%',
//       }}
//     />
//   );
// }

// export default CurvedLineChart;

import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';
import useCategoryStore from 'store/chart/useCategoryStore';
import useCategoryAvg from 'hooks/api/chart/useCategoryAvg';

function CurvedLineChart() {
  const chartRef = useRef(null);
  // const { categoryAvgLoading } = useCategoryAvg();
  const categoryAvgData = useCategoryAvg();
  const {
    monthDate,
    oneBeforeMonthDate,
    twoBeforeMonthDate,
    threeBeforeMonthDate,
    fourBeforeMonthDate,
    monthUsage,
    oneBeforeMonthUsage,
    twoBeforeMonthUsage,
    threeBeforeMonthUsage,
    fourBeforeMonthUsage,
  } = useCategoryStore();

  const dateArr = useMemo(
    () => [
      fourBeforeMonthDate,
      threeBeforeMonthDate,
      twoBeforeMonthDate,
      oneBeforeMonthDate,
      monthDate,
    ],
    [
      fourBeforeMonthDate,
      threeBeforeMonthDate,
      twoBeforeMonthDate,
      oneBeforeMonthDate,
      monthDate,
    ],
  );

  const myApiArr = useMemo(
    () => [
      fourBeforeMonthUsage?.myApi,
      threeBeforeMonthUsage?.myApi,
      twoBeforeMonthUsage?.myApi,
      oneBeforeMonthUsage?.myApi,
      monthUsage?.myApi,
    ],
    [
      fourBeforeMonthUsage,
      threeBeforeMonthUsage,
      twoBeforeMonthUsage,
      oneBeforeMonthUsage,
      monthUsage,
    ],
  );

  const categoryAvgArr = useMemo(
    () => [
      fourBeforeMonthUsage?.categoryAverage,
      threeBeforeMonthUsage?.categoryAverage,
      twoBeforeMonthUsage?.categoryAverage,
      oneBeforeMonthUsage?.categoryAverage,
      monthUsage?.categoryAverage,
    ],
    [
      fourBeforeMonthUsage,
      threeBeforeMonthUsage,
      twoBeforeMonthUsage,
      oneBeforeMonthUsage,
      monthUsage,
    ],
  );
  const options = useMemo(
    () => ({
      tooltip: {
        trigger: 'axis',
        showContent: false,
      },
      legend: {
        orient: 'horizontal',
        bottom: 2,
        data: ['My API', 'Category Average'],
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dateArr,
      },
      yAxis: {
        type: 'value',
      },
      grid: {
        top: '10%',
        bottom: '20%',
      },
      series: [
        {
          name: 'My API',
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' },
          color: '#5470C6',
          areaStyle: { opacity: 0.5, color: '#5470C6' },
          data: myApiArr,
        },
        {
          name: 'Category Average',
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' },
          color: '#EE6666',
          areaStyle: { opacity: 0.5, color: '#EE6666' },

          data: categoryAvgArr,
        },
      ],
    }),
    [dateArr, myApiArr, categoryAvgArr],
  );

  useEffect(() => {
    console.log('curvedLineChart 됨');
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption(options);
    }
  }, [categoryAvgData, options]);

  return (
    <div
      ref={chartRef}
      style={{
        width: '100%',
        height: '400px',
        padding: '5px 5px 5px 10px',
      }}
    />
  );
}

export default CurvedLineChart;
