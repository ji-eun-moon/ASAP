import React from 'react';
import useGetUseList from 'hooks/api/chart/useGetUseList';
import useDetailStore from 'store/chart/useDetailStore';
import UserDailyChart from './UserDailyChart';

function UserDetail() {
  const { useListLoading, useList } = useGetUseList();
  const { apiId, setApiId, setApiTitle } = useDetailStore();

  const handleItemClick = (id: number, title: string) => {
    setApiId(id);
    setApiTitle(title);
  };

  return (
    <div className="container mx-auto mt-12 grid grid-cols-6 gap-5">
      {/* 사용중 리스트 */}
      <div className="border rounded-lg border-gray-300 p-4 col-span-1 min-h-screen">
        {useListLoading ? null : (
          <div>
            <div className="font-bold text-2xl">API 사용 상세</div>
            {useList?.length === 0 && (
              <div className="my-3">사용중인 API가 없습니다.</div>
            )}
            {useList?.map((use) => (
              <div
                key={use.apiId}
                className={`my-3 cursor-pointer ${
                  use.apiId === apiId ? 'color-blue' : 'text-gray-700'
                }`}
                onClick={() => handleItemClick(use.apiId, use.title)}
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
        <UserDailyChart />
      </div>
    </div>
  );
}

export default UserDetail;
