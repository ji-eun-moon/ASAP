import React from 'react';
// import useMemberChart from 'hooks/api/chart/useMemberChart';
import useMonthlyUsage from 'hooks/api/chart/useMonthlyUsage';

function UserApi() {
  // const { memberChart } = useMemberChart(); // 사용자 제공 api 리스트 받기
  const { monthlyUsage } = useMonthlyUsage(); // 사용자 월별 api 사용량 받기
  const onMonthlyUsageHandler = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    await monthlyUsage({
      year: '2023',
      month: '09',
    });
  };
  return (
    <div>
      <button
        type="button"
        onClick={onMonthlyUsageHandler}
        style={{ border: '1px solid' }}
      >
        사용자 월별 api 사용량 가져오기
      </button>
    </div>
  );
}

export default UserApi;
