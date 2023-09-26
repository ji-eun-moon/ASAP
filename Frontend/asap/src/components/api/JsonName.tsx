import React, { useState, useEffect } from 'react';

/** Json 배열 중에서 key가 name 인 값들만 출력
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

interface Props {
  jsonData: string | undefined;
}

function JsonName({ jsonData }: Props) {
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
    (column) => column === 'name',
  ) as (keyof Pair)[];

  return (
    <div className="h-full w-full flex flex-wrap">
      {data.map((item) => (
        <div key={item.idx} className="flex items-center">
          {columns.map((column) => (
            <p key={column} className="ps-2">
              {item[column]}
              {item.idx === data.length ? '' : ','}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default JsonName;
