import React from 'react';
import 'styles/api/ApiTable.scss';

interface TableProps {
  headers: string[];
  data: React.ReactNode[][];
}

function ApiTable({ headers, data }: TableProps) {
  return (
    <table className="api-table">
      <thead>
        <tr className="table-header">
          {headers.map((header, index) => (
            <th key={header} className={`header-item col-table-${index + 1}`}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.join('-')}>
            {row.map((cell, index) => (
              <td
                key={cell?.toString()}
                className={`data-item col-table-${index + 1}`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ApiTable;
