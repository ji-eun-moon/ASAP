import React, { useRef, useEffect, useCallback } from 'react';
import useAuthStore from 'store/auth/useAuthStore';
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
  const { loginType } = useAuthStore((state) => state);

  const getTitle = useCallback(() => {
    if (loginType === 'supplier') {
      return [
        {
          left: 'center',
          text: '최근 30일 제공량',
          textStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        },
        {
          top: '50%',
          left: 'center',
          text: '최근 30일 수익',
          textStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        },
      ];
    }
    return [
      {
        left: 'center',
        text: '최근 30일 요청량',
        textStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      },
      {
        top: '50%',
        left: 'center',
        text: '최근 30일 사용 요금',
        textStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      },
    ];
  }, [loginType]);

  useEffect(() => {
    if (!chartRef.current) return undefined;

    const dateList = data.map((item) => item.date);
    const amountList = data.map((item) => item.amount);
    const priceList = data.map((item) => item.price);

    const options = {
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
      title: getTitle(),
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
    };

    const chart = echarts.init(chartRef.current);
    chart.setOption(options);

    return () => chart.dispose();
  }, [data, getTitle]);

  return <div ref={chartRef} style={{ width: '100%', height: '700px' }} />;
}

export default LineGradient;
