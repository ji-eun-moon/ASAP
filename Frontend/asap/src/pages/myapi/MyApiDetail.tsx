import React from 'react';
import { useSearchParams } from 'react-router-dom';
import useAuthStore from 'store/auth/useAuthStore';
import useMonthlyDetail from 'hooks/api/chart/useMonthlyDetail';
import Spinner from 'components/common/Spinner';

function MyApiDetail() {
  const [searchParams] = useSearchParams();
  const { loginType } = useAuthStore((state) => state);
  const { monthlyLoading, monthlyDetail } = useMonthlyDetail();

  const year = searchParams.get('year');
  const month = searchParams.get('month');

  console.log(monthlyDetail, monthlyLoading);

  return (
    <div className="container mx-auto page-container">
      <div>
        {year}년 {month}월 API {loginType === 'supplier' ? '제공' : '사용'} 내역
      </div>
      {monthlyLoading ? <Spinner size="12" /> : <div>ggg</div>}
    </div>
  );
}

export default MyApiDetail;
