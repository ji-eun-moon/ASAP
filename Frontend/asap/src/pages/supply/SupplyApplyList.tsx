import React, { useState } from 'react';
import useSupplyApplyList from 'hooks/api/supply/useSupplyApplyList';
import Header from 'components/common/Header';
import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';

function SupplyApplyList() {
  const { supplyApplyList } = useSupplyApplyList();

  const [stateApis, setStateApis] = useState(supplyApplyList);

  const [selectedItem, setSelectItem] = useState('전체 조회');
  const handleItemClick = (item: string) => {
    setSelectItem(item);
    setStateApis(
      supplyApplyList.filter((api) => api.progress === item.slice(0, 2)),
    );
  };

  const getClassName = (progress: string) => {
    switch (progress) {
      case '대기':
        return 'wait';
      case '승인':
        return 'approve';
      case '진행':
        return 'proceed';
      case '거절':
        return 'reject';
      default:
        return '';
    }
  };

  const allApis = () => {
    if (supplyApplyList.length === 0) {
      return <div> {selectedItem.slice(0, 2)} api 내역이 없습니다</div>;
    }
    return supplyApplyList.map((api) => (
      <div className="w-full grid grid-cols-5 my-5" key={api.applyId}>
        <div className="col-span-1 text-center font-medium">
          {api.createDate.split('T')[0]}
        </div>
        <div className="col-span-3 text-center font-medium">{api.title}</div>

        <div className="col-span-1 text-center font-medium flex justify-center">
          <div
            // className="col-span-1 text-center font-medium"
            className={getClassName(api.progress)}
          >
            {api.progress}
          </div>
        </div>
      </div>
    ));
  };
  const filterdApis = () => {
    if (stateApis.length === 0) {
      return <div> {selectedItem.slice(0, 2)} api 내역이 없습니다</div>;
    }
    return stateApis.map((api) => (
      <div className="w-full grid grid-cols-5 my-5">
        <div className="col-span-1 text-center font-medium">
          {api.createDate.split('T')[0]}
        </div>
        <div className="col-span-3 text-center font-medium">{api.title}</div>

        <div className="col-span-1 text-center font-medium flex justify-center">
          <div className={getClassName(api.progress)}>{api.progress}</div>
        </div>
      </div>
    ));
  };
  const data = [
    {
      label: '전체 조회',
      value: '전체 조회',
    },
    {
      label: '대기 조회',
      value: '대기 조회',
    },
    {
      label: '승인 조회',
      value: '승인 조회',
    },
    {
      label: '진행 조회',
      value: '진행 조회',
    },
    {
      label: '거절 조회',
      value: '거절 조회',
    },
  ];
  return (
    <div>
      <Header title="API 신청내역" />

      <div className="flex justify-arouond w-full mt-8">
        <div className="border-right w-1/6 flex flex-col justify-center items-center text-center my-4">
          <Tabs value={selectedItem} orientation="vertical">
            <TabsHeader className="w-40">
              {data.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  className="place-items-start"
                  onClick={() => handleItemClick(label)}
                >
                  <button type="button" className=" flex items-center gap-2">
                    {label}
                  </button>
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
        </div>
        <div className="w-5/6 px-8">
          <div className="my-4 w-full grid grid-cols-5 border-bottom py-3">
            <div className="col-span-1 text-center text-lg font-bold">
              신청일자
            </div>
            <div className="col-span-3 text-center text-lg font-bold">
              API 제목
            </div>
            <div className="col-span-1 text-center text-lg font-bold">상태</div>
          </div>

          <div className="my-6 pb-3 w-full border-bottom text-center">
            {selectedItem === '전체 조회' ? allApis() : filterdApis()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplyApplyList;
