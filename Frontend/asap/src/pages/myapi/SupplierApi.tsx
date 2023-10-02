import React from 'react';
import SupplierMonthly from 'components/myapi/supplier/SupplierMonthly';
import SupplierDetail from 'components/myapi/supplier/SupplierDetail';
import useCategoryAvg from 'hooks/api/chart/useCategoryAvg';

function SupplierApi() {
  const { categoryAvg } = useCategoryAvg();
  return (
    <div>
      {/* 제공자 월별 통계 */}
      <SupplierMonthly />
      {/* 제공자 상세 통계 */}
      <SupplierDetail />
      <button type="button" onClick={() => categoryAvg}>
        click
      </button>
    </div>
  );
}

export default SupplierApi;
