import React from 'react';
import { useNavigate } from 'react-router-dom';
import useMonthlyUsage from 'hooks/api/chart/useMonthlyUsage';
import useMonthlyStore from 'store/chart/useMonthlyStore';
import Spinner from 'components/common/Spinner';
import { Card, Button } from '@material-tailwind/react';
import SelectDate from '../common/SelectDate';

function UserMonthly() {
  const navigate = useNavigate();
  const { monthlyLoading } = useMonthlyUsage(); // 사용자 월별 api 사용량 받기
  const { totalAmount, totalPrice, year, month } = useMonthlyStore();

  // 사용 요금과 사용 가격 1000 단위로 쉼표
  const formattedTotalAmount = totalAmount.toLocaleString();
  const formattedTotalPrice = totalPrice.toLocaleString();

  return (
    <div className="container mx-auto mt-20">
      {monthlyLoading ? (
        <div className="flex justify-center">
          <Spinner size="12" />
        </div>
      ) : (
        <div>
          <div className="font-bold text-3xl">API 사용 통계</div>
          {/* 날짜 선택 */}
          <SelectDate />

          <Card className="p-5">
            {/* 사용량, 사용 요금 */}
            <div className="flex grid grid-cols-2 gap-4 text-black">
              <div className="col-span-1 flex justify-center border border-blue-600 text-lg p-2 rounded-lg gap-3">
                <p>당월 요청량</p>
                <p>
                  <span className="text-blue-700">{formattedTotalAmount}</span>{' '}
                  건
                </p>
              </div>
              <div className="col-span-1 flex justify-center border border-blue-600 text-lg p-2 rounded-lg gap-3">
                <p>당월 사용 요금</p>
                <p>
                  <span className="text-blue-700">{formattedTotalPrice}</span>{' '}
                  원
                </p>
              </div>
            </div>
          </Card>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() =>
                navigate(`/myapi/detail?year=${year}&month=${month}`)
              }
            >
              상세 보기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMonthly;
