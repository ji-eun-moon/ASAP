import React from 'react';
import useSupplierChart from 'hooks/api/chart/useSupplierChart';

function SupplierApi() {
  const { supplierChart } = useSupplierChart();
  return (
    <div>
      <button
        type="button"
        onClick={supplierChart}
        style={{ border: '1px solid' }}
      >
        제공자 통계 가져오기
      </button>
    </div>
  );
}

export default SupplierApi;
