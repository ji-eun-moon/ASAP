import React from 'react';
import useGetOfferList from 'hooks/api/chart/useGetOfferList';
import useDetailStore from 'store/chart/useDetailStore';
import Spinner from 'components/common/Spinner';
import CurvedLineChart from 'components/chart/CurvedLineChart';

function SupplierDetail() {
  const { offerListLoading, offerList } = useGetOfferList();
  const { apiId, setApiId } = useDetailStore();

  return (
    <div className="container mx-auto mt-12 grid grid-cols-6 gap-5">
      {/* 제공중 리스트 */}
      <div className="border rounded-lg border-gray-300 p-4 col-span-1">
        {offerListLoading ? (
          <Spinner size="12" />
        ) : (
          <div>
            <div className="font-bold text-2xl">API 제공 상세</div>
            {offerList?.map((offer) => (
              <div
                key={offer.apiId}
                className={`my-3 cursor-pointer ${
                  offer.apiId === apiId ? 'color-blue' : 'text-gray-700'
                }`}
                onClick={() => setApiId(offer.apiId)}
                aria-hidden="true"
              >
                {offer.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 제공 차트 */}
      <div className="col-span-5">
        <CurvedLineChart />
      </div>
    </div>
  );
}

export default SupplierDetail;
