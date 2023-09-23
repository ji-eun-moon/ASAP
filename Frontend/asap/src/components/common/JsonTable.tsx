import React, { useState, useEffect } from 'react';

/**
 * @prop {string} jsonData Json 파일 String으로 변환한 문자열 전체
 */

interface Pair {
  idx: number;
  key: string;
  name: string;
  type: string;
  required: string;
  description: string;
}

interface JsonTableProps {
  jsonData: string | undefined;
}

function JsonTable({ jsonData }: JsonTableProps) {
  const [data, setData] = useState<Pair[]>([]);

  useEffect(() => {
    try {
      if (jsonData) {
        const parsedData = JSON.parse(jsonData);
        setData(parsedData);
      }
    } catch (error) {
      console.error('Invalid JSON data:', error);
    }
  }, [jsonData]);

  if (!data || data.length === 0) {
    return null;
  }

  const columns = Object.keys(data[0]).filter(
    (column) => column !== 'idx',
  ) as (keyof Pair)[];

  const columnGrid = (column: string) => {
    if (column === 'description') {
      return 'col-span-5';
    }
    if (column === 'required') {
      return 'col-span-1';
    }
    return 'col-span-2';
  };

  return (
    <div className="h-full w-full">
      {data.map((item) => (
        <div
          key={item.idx}
          className="flex grid grid-cols-12 items-center mt-3"
        >
          {columns.map((column) => (
            <pre
              key={column}
              className={`${columnGrid(column)} ps-2 font-semibold`}
            >
              {item[column]}
            </pre>
          ))}
        </div>
      ))}
    </div>
  );
}

export default JsonTable;
