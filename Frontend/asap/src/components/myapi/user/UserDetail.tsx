import React from 'react';
import useGetUseList from 'hooks/api/chart/useGetUseList';
import useDetailStore from 'store/chart/useDetailStore';
import DailyChart from './DailyChart';

function UserDetail() {
  const { useListLoading, useList } = useGetUseList();
  const { apiId, setApiId } = useDetailStore();

  return (
    <div className="container mx-auto mt-12 grid grid-cols-6 gap-5">
      {/* 사용중 리스트 */}
      <div className="border rounded-lg border-gray-300 p-4 col-span-1">
        {useListLoading ? null : (
          <div>
            <div className="font-bold text-2xl">API 사용 상세</div>
            {useList?.map((use) => (
              <div
                key={use.apiId}
                className={`my-3 cursor-pointer ${
                  use.apiId === apiId ? 'color-blue' : 'text-gray-700'
                }`}
                onClick={() => setApiId(use.apiId)}
                aria-hidden="true"
              >
                {use.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 제공 차트 */}
      <div className="col-span-5">
        <DailyChart />
      </div>
    </div>
  );
}

export default UserDetail;
