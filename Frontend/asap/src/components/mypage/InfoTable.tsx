import React from 'react';
import './InfoTable.scss';

/**
 * 테이블 한줄
 * @param left 왼쪽항목
 * @param right 오른쪽항목
 */
function Table({ left, right }: { left: string; right: string | undefined }) {
  return (
    <div className="table-container grid grid-cols-12 justify-start items-center">
      {/* 왼쪽부분 */}
      <div className="col-span-3 left-bgc flex items-center text-gray-600">
        <span className="ml-7 text-.base table-text font-bold">{left}</span>
      </div>
      {/* 오른쪽부분 */}
      <div className="col-span-9 right-bgc flex items-center">
        <span className="ml-7 text-base table-text font-bold">{right}</span>
      </div>
    </div>
  );
}

export default Table;
