import React from 'react';
import useGetUseList from 'hooks/api/chart/useGetUseList';
import useDailyUsage from 'hooks/api/chart/useDailyUsage';

function UserDetail() {
  const { useListLoading } = useGetUseList();
  const { dailyLoading } = useDailyUsage();
  return (
    <div>
      UserDetail
      {dailyLoading}
      {useListLoading}
    </div>
  );
}

export default UserDetail;
