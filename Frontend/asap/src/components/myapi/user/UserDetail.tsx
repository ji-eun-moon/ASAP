import React from 'react';
import useGetUseList from 'hooks/api/chart/useGetUseList';
import useDetailStore from 'store/chart/useDetailStore';
import UserDailyChart from './UserDailyChart';

function UserDetail() {
  const { useListLoading, useList } = useGetUseList();
  const { apiId, setApiId, setApiTitle, apiTitle } = useDetailStore();

  const handleItemClick = (id: number, title: string) => {
    setApiId(id);
    setApiTitle(title);
  };

  return (
    <div className="container mx-auto mt-12 grid grid-cols-9 gap-10">
      {/* 사용중 리스트 */}
      <div className="border rounded-lg border-gray-300 p-4 col-span-2 min-h-screen">
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

      {/* 사용 차트 */}
      <div className="col-span-7">
        <div className="font-bold text-3xl mb-12">
          <span className="ms-12">&apos;{apiTitle}&apos;</span>{' '}
          <span>통계</span>
        </div>
        <div className="mt-16">
          <UserDailyChart />
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
