import React, { useRef, useEffect, useMemo } from 'react';
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

  // count 값 최대값 계산
  const maxCount = Math.max(...countArr);

  // count값이 5보다 적을때, 클때 계산
  const yAxisConfig = useMemo(() => {
    if (maxCount <= 5) {
      return {
        type: 'value',
        min: 0,
        max: 5,
        interval: 1,
      };
    }
    return {
      type: 'value',
    };
  }, [maxCount]);

  const options = useMemo(
    () => ({
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
      yAxis: yAxisConfig,
      series: [
        {
          data: countArr,
          type: 'line',
        },
      ],
    }),
    [dateArr, countArr, yAxisConfig],
  );

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
