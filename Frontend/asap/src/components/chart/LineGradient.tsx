import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';

interface IDailyUsage {
  date: string;
  amount: number;
  price: number;
}

interface Props {
  data: IDailyUsage[];
}

function LineGradient({ data }: Props) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const dateList = data.map((item) => item.date);
  const amountList = data.map((item) => item.amount);
  const priceList = data.map((item) => item.price);

  const [options] = useState({
    visualMap: [
      {
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400,
      },
      {
        show: false,
        type: 'continuous',
        seriesIndex: 1,
        dimension: 0,
        min: 0,
        max: dateList.length - 1,
      },
    ],

    title: [
      {
        left: 'center',
        text: 'amount',
      },
      {
        top: '55%',
        left: 'center',
        text: 'price',
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
    xAxis: [
      {
        data: dateList,
      },
      {
        data: dateList,
        gridIndex: 1,
      },
    ],
    yAxis: [
      {},
      {
        gridIndex: 1,
      },
    ],
    grid: [
      {
        bottom: '60%',
      },
      {
        top: '60%',
      },
    ],
    series: [
      {
        type: 'line',
        showSymbol: false,
        data: amountList,
      },
      {
        type: 'line',
        showSymbol: false,
        data: priceList,
        xAxisIndex: 1,
        yAxisIndex: 1,
      },
    ],
  });

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      chart.setOption(options);
    }
  }, [options, chartRef, data]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
}

export default LineGradient;
