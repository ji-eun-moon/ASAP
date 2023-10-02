import ChartFrame from 'components/chart/ChartFramee';
import LineChart from 'components/chart/LineChart';
import PieChart from 'components/chart/PieChart2';
import React from 'react';

const test = () => {
  const sampleTitle = 'Sample Chart Title';
  const sampleContent = ['금융', '보험', '차량', '보안', '지도'];
  const sampleValue = [1048, 735, 580, 484, 300];
  return (
    <div className="ml-32 mt-32 flex">
      <div>
        <ChartFrame
          width="500px"
          height="500px"
          title="안녕하세요"
          fontSize="20px"
          chart={<LineChart />}
        />
      </div>
      <div className=" ml-10">
        <ChartFrame
          width="500px"
          height="500px"
          title="안녕하세요"
          fontSize="20px"
          chart={
            <PieChart
              title={sampleTitle}
              content={sampleContent}
              value={sampleValue}
            />
          }
        />
      </div>
    </div>
  );
};

export default test;
