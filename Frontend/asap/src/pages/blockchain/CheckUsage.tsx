import React, { useState } from 'react';
// import useCheckUsage from 'hooks/api/blockchain/useCheckUsage';
// import useWeb3 from 'hooks/api/wallet/useWeb3';
import Header from 'components/common/Header';
import Calendar from 'components/blockchain/Calendar';
import { ReactComponent as Explain } from 'assets/icons/Explain.svg';
import { ReactComponent as Cal } from 'assets/icons/Calendar.svg';
import 'styles/blockchain/CheckUsage.scss';
// import Loading from 'components/common/Loading';
// import { SHA256 } from 'crypto-js';

function CheckUsage() {
  // const checkUsage = useCheckUsage();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  // const [database, setDatabase] = useState<string | null>(null);
  // const [transaction, setTransaction] = useState<string | null>(null);
  // const { getTransaction } = useWeb3();

  return (
    <div>
      <Header title="사용량 검증하기" />
      <div className="container mx-auto page-container">
        <div className="explain">
          <Explain className="w-7 h-auto mr-4" />
          <div>사용법 확인하기</div>
        </div>
        <div className="flex items-center my-8">
          <div className="text-xl font-bold pr-7">조회 기간을 선택해주세요</div>
          <label className="flex items-center pick-date">
            <Cal className="h-5" />
            <Calendar
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            <div className="padding">
              {endDate
                ? `${endDate.getFullYear()}년 ${String(
                    endDate.getMonth() + 1,
                  ).padStart(2, '0')}월 ${String(endDate.getDate()).padStart(
                    2,
                    '0',
                  )}일`
                : null}
            </div>
          </label>
          {startDate ? (
            <button type="button" className="check-button">
              검증하기
            </button>
          ) : null}
        </div>
        <div className="flex">
          <div className="flex-1 mr-2">
            <div className="text-xl font-bold">정산에 사용된 데이터</div>
            <div className="check-back data">
              {/* {!database ? '아직 선택된 데이터가 없습니다' : null} */}
            </div>
          </div>
          <div className="flex-1 ml-2">
            <div className="text-xl font-bold">블록에 저장된 데이터</div>
            <div className="check-back data">
              {/* {!transaction ? '아직 선택된 데이터가 없습니다' : null} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckUsage;
