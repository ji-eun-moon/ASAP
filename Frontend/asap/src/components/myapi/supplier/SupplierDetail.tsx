import React from 'react';
import useGetOfferList from 'hooks/api/chart/useGetOfferList';
import useDetailStore from 'store/chart/useDetailStore';
import CurvedLineChart from 'components/chart/CurvedLineChart';
import ChartFrame from 'components/chart/ChartFramee';
import SupplierDailyChart from './SupplierDailyChart';

function SupplierDetail() {
  const { offerListLoading, offerList } = useGetOfferList();
  const { apiId, setApiId, setApiTitle, apiTitle } = useDetailStore();

  const handleItemClick = (id: number, title: string) => {
    setApiId(id);
    setApiTitle(title);
  };

  return (
    <div className="container mx-auto mt-12 grid grid-cols-6 gap-5">
      {/* 제공중 리스트 */}
      <div className="border rounded-lg border-gray-300 p-4 col-span-1 min-h-screen">
        {offerListLoading ? null : (
          <div>
            <div className="font-bold text-2xl">API 제공 상세</div>
            {offerList?.length === 0 && (
              <div className="my-3">제공중인 API가 없습니다.</div>
            )}
            {offerList?.map((offer) => (
              <div
                key={offer.apiId}
                className={`my-3 cursor-pointer ${
                  offer.apiId === apiId ? 'color-blue' : 'text-gray-700'
                }`}
                onClick={() => handleItemClick(offer.apiId, offer.title)}
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
        <div className="font-bold text-3xl mb-12">
          <span className="ms-12">&apos;{apiTitle}&apos;</span>{' '}
          <span>조회</span>
        </div>
        <div className="ml-10">
          <ChartFrame
            width="500px"
            height="500px"
            title="동일 카테고리 API 평균"
            fontSize="20px"
            chart={<CurvedLineChart />}
          />
        </div>
        <div className="mt-16">
          <SupplierDailyChart />
        </div>
      </div>
    </div>
  );
}

export default SupplierDetail;
