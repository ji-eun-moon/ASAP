import React from 'react';

/**
 * 차트 프레임
 * @param width 너비
 * @param height 높이
 * @param title 타이틀
 * @param fontsize 폰트 크기
 */

interface ChartFrameProps {
  width: string;
  height: string;
  title: string;
  fontSize: string;
}

function ChartFrame({ width, height, title, fontSize }: ChartFrameProps) {
  const frameStyle = {
    width,
    height,
  };
  const fontSizeStyle = {
    fontSize,
  };
  return (
    <div
      className="border relative border-gray-400 rounded-lg"
      style={frameStyle}
    >
      <div
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 font-bold bg-white px-8"
        style={fontSizeStyle}
      >
        {title}
      </div>
    </div>
  );
}

export default ChartFrame;
