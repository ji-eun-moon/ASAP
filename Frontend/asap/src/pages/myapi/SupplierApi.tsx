import React from 'react';
<<<<<<< HEAD
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
=======
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
>>>>>>> bdae4cd19b3e5e9747f97ac5a13eb2d4223c9cc0
      </button>
    </div>
  );
}

export default SupplierApi;
