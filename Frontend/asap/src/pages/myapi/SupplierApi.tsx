import React from 'react';
import useSupplierChart from 'hooks/api/chart/useSupplierChart';
import useGetSupplyList from 'hooks/api/api/useGetSupplyList';

function SupplierApi() {
  const { supplierChart } = useSupplierChart();
  const { getSupplyList } = useGetSupplyList();

  return (
    <div>
      <button
        type="button"
        onClick={supplierChart}
        style={{ border: '1px solid' }}
      >
        제공자 통계 가져오기
      </button>
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={getSupplyList}
      >
        제공 api 리스트 받기 테스트
      </button>
    </div>
  );
}

export default SupplierApi;
