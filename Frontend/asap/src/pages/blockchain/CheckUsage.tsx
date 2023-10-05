import React, { useState } from 'react';
import useCheckUsage from 'hooks/api/blockchain/useCheckUsage';
import useWeb3 from 'hooks/api/wallet/useWeb3';
import useGetUseList from 'hooks/api/chart/useGetUseList';
import Header from 'components/common/Header';
import Calendar from 'components/blockchain/Calendar';
import Dropdown from 'components/blockchain/Dropdown';
import { ReactComponent as Explain } from 'assets/icons/Explain.svg';
import { ReactComponent as Cal } from 'assets/icons/Calendar.svg';
import 'styles/blockchain/CheckUsage.scss';
// import Loading from 'components/common/Loading';
// import { SHA256 } from 'crypto-js';

function CheckUsage() {
  const { checkUsage } = useCheckUsage();
  const { useList } = useGetUseList();
  const { getTransaction } = useWeb3();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [database, setDatabase] = useState<string | null>(null);
  // const [dataDetail, setDataDetail] = useState<string[]>([]);
  const [transaction, setTransaction] = useState<string | null>(null);
  const [apiTitle, setApiTitle] = useState<string | null>(null);
  // const apiTitles = useList?.map((item) => item.title);

  const formatDate = (dateString: Date): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  if (startDate) {
    console.log(formatDate(startDate));
  }

  const onSelectAPI = (selectedTitle: string) => {
    setDatabase(null);
    setTransaction(null);
    setApiTitle(selectedTitle);
  };

  const onCheckHandler = async () => {
    if (startDate && endDate) {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      const data = await checkUsage({
        apiTitle: '키워드로 장소 검색하기',
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });

      setDatabase(data.hashToString);
      // setDataDetail(data.usageRecord);
      setTransaction(data.transactionHash);
    }
  };

  const onTransactionHandler = () => {
    if (transaction) {
      getTransaction(transaction);
    }
  };

  return (
    <div>
      <Header title="사용량 검증하기" />
      <div className="container mx-auto page-container">
        <div className="explain">
          <Explain className="w-7 h-auto mr-4" />
          <div>사용법 확인하기</div>
        </div>
        <div className="flex items-center my-8">
          <div className="text-xl font-bold pr-7 w-3/12">
            조회할 API를 선택하세요
          </div>
          {useList ? (
            <Dropdown
              options={useList}
              apiTitle={apiTitle}
              onSelect={onSelectAPI}
            />
          ) : null}
        </div>
        <div className="flex items-center my-8">
          <div className="text-xl font-bold pr-7 w-3/12">
            조회 기간을 선택하세요
          </div>
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
            <button
              type="button"
              className="check-button"
              onClick={onCheckHandler}
            >
              검증하기
            </button>
          ) : null}
        </div>
        <div className="flex items-start my-4">
          <div className="text-xl font-bold w-3/12">블록에 저장된 데이터</div>
          <div className="check-back data w-9/12">
            {!transaction ? '아직 선택된 데이터가 없습니다' : transaction}
            <button type="button" onClick={onTransactionHandler}>
              체크
            </button>
          </div>
        </div>
        <div className="flex items-start my-4">
          <div className="text-xl font-bold w-3/12">정산에 사용된 데이터</div>
          <div className="check-back data w-9/12">
            {!database ? '아직 선택된 데이터가 없습니다' : database}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckUsage;
