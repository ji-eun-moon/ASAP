import React from 'react';
import useGetUseList from 'hooks/api/chart/useGetUseList';
import useDailyUsage from 'hooks/api/chart/useDailyUsage';
import useDetailStore from 'store/chart/useDetailStore';
import Spinner from 'components/common/Spinner';

function UserDetail() {
  const { useListLoading, useList } = useGetUseList();
  const { dailyLoading } = useDailyUsage();
  const { apiId, setApiId } = useDetailStore();

  return (
    <div className="container mx-auto mt-12 grid grid-cols-6 gap-5">
      {/* 제공중 리스트 */}
      <div className="border rounded-lg border-gray-300 p-4 col-span-1">
        {useListLoading ? (
          <Spinner size="12" />
        ) : (
          <div>
            <div className="font-bold text-2xl">API 제공 상세</div>
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
      <div className="col-span-5">차트가 들어갑니다.{dailyLoading}</div>
    </div>
  );
}

export default UserDetail;
