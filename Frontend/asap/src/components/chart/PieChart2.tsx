import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function PieChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const option = {
        title: {
          text: '파이의 타이틀 적기',
          subtext: '부제목 적기',
          left: 'center', // 타이틀의 위치
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'horizontal',
          top: 'bottom',
          left: 'center',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' },
            ],
            label: {
              show: true,
              formatter: '{d}%', // 라벨 형식 설정 (이름: 백분율)
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };

      myChart.setOption(option);

      // 차트 컴포넌트 크기를 동적으로 조정
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    }
  }, []);

  return (
    <div
      ref={chartRef}
      style={{
        width: '100%',
        height: '400px', // 차트 높이 설정
      }}
    />
  );
}

export default PieChart;
