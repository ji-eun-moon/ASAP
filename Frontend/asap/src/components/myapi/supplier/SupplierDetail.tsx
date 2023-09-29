import React from 'react';
import useGetOfferList from 'hooks/api/chart/useGetOfferList';

function SupplierDetail() {
  const { offerListLoading } = useGetOfferList();
  return (
    <div>
      SupplierDetail
      {offerListLoading}
    </div>
  );
}

export default SupplierDetail;
