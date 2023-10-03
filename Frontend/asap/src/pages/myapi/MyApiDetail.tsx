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
      <div className="text-4xl font-bold">
        <span className="color-blue">
          {year}년 {month}월{' '}
        </span>{' '}
        API {loginType === 'supplier' ? '제공' : '사용'} 내역
      </div>
      {monthlyLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner size="12" />
        </div>
      ) : (
        <div className="mt-12">
          {monthlyDetail && monthlyDetail.length > 0 ? (
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-300 p-2">API 이름</th>
                  <th className="border border-gray-300 p-2">
                    {loginType === 'supplier' ? '제공량 (건)' : '사용량 (건)'}
                  </th>
                  <th className="border border-gray-300 p-2">
                    {loginType === 'supplier' ? '수익 (원)' : '사용 요금 (원)'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {monthlyDetail.map((detail) => (
                  <tr key={detail.apiResponse.apiId}>
                    <td className="border border-gray-300 p-2 text-center">
                      {detail.apiResponse.title}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {detail.amount.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {detail.apiResponse.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 text-center text-2xl">
              조회 내역이 없습니다.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default MyApiDetail;
