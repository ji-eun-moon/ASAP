import React, { useState, useEffect } from 'react';

interface Pair {
  idx: number;
  key: string;
  name: string;
  type: string;
  required: string;
  description: string;
}
interface JsonTableProps {
  jsonData: string;
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

  return (
    <div className="h-full w-full">
      {data.map((item) => (
        <div key={item.idx} className="flex grid grid-cols-5">
          {columns.map((column) => (
            <p key={column} className="col-span-1">
              {item[column]}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default JsonTable;
