import React, { useState, useEffect } from 'react';

import usePairStore from 'store/supply/usePairStore';

interface Pair {
  id: number;
  key: string;
  name: string;
  type: string;
  description: string;
}

function JsonTable() {
  const { jsonOutput } = usePairStore();
  const [data, setData] = useState<Pair[]>([]);

  useEffect(() => {
    try {
      if (jsonOutput) {
        const parsedData = JSON.parse(jsonOutput);
        setData(parsedData);
      }
    } catch (error) {
      console.error('Invalid JSON data:', error);
    }
  }, [jsonOutput]);

  if (!data || data.length === 0) {
    return null;
  }

  const columns = Object.keys(data[0]).filter(
    (column) => column !== 'id',
  ) as (keyof Pair)[];

  return (
    <div className="h-full w-full">
      {data.map((item) => (
        <div key={item.id} className="flex grid grid-cols-4">
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
