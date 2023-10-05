import React, { useEffect } from 'react';
import useGetUseList from 'hooks/api/chart/useGetUseList';
import useDetailStore from 'store/chart/useDetailStore';
import Spinner from 'components/common/Spinner';
import UserDailyChart from './UserDailyChart';

function UserDetail() {
  const { useListLoading, useList } = useGetUseList();
  const { apiId, setApiId, setApiTitle, apiTitle, resetApiDetails } =
    useDetailStore();

  const renderApiTitile = () => {
    if (useListLoading) {
      return <Spinner size="8" />;
    }
    if (!apiTitle) {
      return <div>사용 중인 API가 없습니다.</div>;
    }
    return (
      <div>
        <span className="ms-2">&apos;{apiTitle}&apos;</span> <span>통계</span>
      </div>
    );
  };

  const handleItemClick = (id: number, title: string) => {
    setApiId(id);
    setApiTitle(title);
  };

  useEffect(() => {
    return () => resetApiDetails();
  }, [resetApiDetails]);

  return (
    <div
      className="container mx-auto mt-12 grid grid-cols-9 gap-10 flex justify-center"
      style={{ width: '85%' }}
    >
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
        <div className="font-bold text-3xl mb-12 ml-8">{renderApiTitile()}</div>
        <div className="flex flex-col items-center justify-around">
          <div className="w-full flex justify-evenly">
            <UserDailyChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
