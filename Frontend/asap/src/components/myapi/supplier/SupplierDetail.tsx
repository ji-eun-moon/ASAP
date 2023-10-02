import React from 'react';
import useGetOfferList from 'hooks/api/chart/useGetOfferList';
import useDetailStore from 'store/chart/useDetailStore';

function SupplierDetail() {
  const { offerListLoading, offerList } = useGetOfferList();
  const { apiId, setApiId, setApiTitle } = useDetailStore();

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
      <div className="col-span-5">차트가 들어갑니다.</div>
    </div>
  );
}

export default SupplierDetail;
