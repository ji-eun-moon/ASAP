import ChartFrame from 'components/chart/ChartFrame';
import LineChart from 'components/chart/LineChart';
import React from 'react';

const test = () => {
  return (
    <div className="ml-32 mt-32">
      <div>
        <ChartFrame
          width="500px"
          height="500px"
          title="안녕하세요"
          fontSize="20px"
          chart={<LineChart />}
        />
      </div>
    </div>
  );
};

export default test;
