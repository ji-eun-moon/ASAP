import React from 'react';

/**
 * 차트 프레임
 * @param width 너비
 * @param height 높이
 * @param title 타이틀
 */

interface ChartFrameProps {
  width: string; // 너비를 선택적으로 지정할 수 있도록 변경
  height: string; // 높이를 선택적으로 지정할 수 있도록 변경
  title: string;
}

function ChartFrame({
  width = '50px',
  height = '50px',
  title,
}: ChartFrameProps) {
  const frameStyle = {
    width,
    height,
  };

  return (
    <div className="chart-frame" style={frameStyle}>
      {/* 왼쪽부분 */}
      <div className="chart-title">{title}</div>
    </div>
  );
}

export default ChartFrame;
