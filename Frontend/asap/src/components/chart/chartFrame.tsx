import React from 'react';

/**
 * 차트 프레임
 * @param width 너비
 * @param height 높이
 * @param title 타이틀
 */

interface ChartFrameProps {
  width: string;
  height: string;
  title: string;
}

function ChartFrame({ width, height, title }: ChartFrameProps) {
  const frameStyle = {
    width,
    height,
  };

  return (
    <div className="border" style={frameStyle}>
      <div className="">{title}</div>
    </div>
  );
}

export default ChartFrame;
