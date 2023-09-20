import React, { useState } from 'react';
import 'styles/admin/apiApproval.scss';

import useAdminApiList from 'hooks/api/admin/useAdminApiList';
import useAdminApiProgress from 'hooks/api/admin/useAdminApiProgress';
// import useAdminApiRejectReason from 'hooks/api/admin/useAdminApiRejectReason';

// import useAdminApiDelete from 'hooks/api/admin/useAdminApiDelete';
// import { Button } from '@material-tailwind/react';
function ApiApproval() {
  const { apis, setLastChanged } = useAdminApiList();
  const { adminApiProgress } = useAdminApiProgress();
  const [stateApis, setStateApis] = useState(apis);
  // const { adminApiRejectReason } = useAdminApiRejectReason();

  // const [apis, setApiList] = useState<ApiData[]>([]);

  const [selectedItem, setSelectItem] = useState('전체 조회');
  const handleItemClick = (item: string) => {
    setSelectItem(item);
    setStateApis(apis.filter((api) => api.progress === item.slice(0, 2)));
  };

  const [rejectState, setRejectState] = useState(false);
  const handleRejectState = () => {
    // adminApiRejectReason();
  };

  const changeState = (applyId: number, newState: string) => {
    const doChange = async () => {
      console.log(applyId, newState);
      adminApiProgress({ applyId, progress: newState });
      // await adminApiList();
      await setLastChanged(new Date().getTime());
      if (newState === '거절') {
        setRejectState(true);
        handleRejectState();
      }
      window.location.reload();
    };
    doChange();
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

  const [clicked, setClicked] = useState(false);
  const [clickedapi, setClickedApi] = useState<number | undefined>(undefined);
  const handleClick = (applyId: number) => {
    setClickedApi(applyId);
    setClicked(!clicked);
  };

  const allApis = () => {
    if (apis.length === 0) {
      return <div>신청 api 내역이 없습니다</div>;
    }

    return apis.map((api) => (
      <div className="w-full grid grid-cols-5 my-5">
        <div className="col-span-1 text-center font-medium">
          {api.createDate.split('T')[0]}
        </div>
        <div className="col-span-3 text-center font-medium">{api.title}</div>

        <div className="col-span-1 text-center">
          <button
            type="button"
            onClick={() => handleClick(api.applyId)}
            className={getClassName(api.progress)}
          >
            {api.progress}
          </button>
          {clicked && api.applyId === clickedapi ? (
            <ul className="ulTag">
              <li>
                <button
                  type="button"
                  onClick={() => changeState(api.applyId, '대기')}
                >
                  대기
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => changeState(api.applyId, '승인')}
                >
                  승인
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => changeState(api.applyId, '진행')}
                >
                  진행
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => changeState(api.applyId, '거절')}
                >
                  거절
                </button>
              </li>
            </ul>
          ) : (
            ''
          )}
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

        <div className="col-span-1 text-center">
          <div className="flex flex-col parent">
            <button
              type="button"
              onClick={() => handleClick(api.applyId)}
              className={getClassName(api.progress)}
            >
              {api.progress}
            </button>
            {clicked && api.applyId === clickedapi ? (
              <ul className="ulTag">
                <li>
                  <button
                    type="button"
                    onClick={() => changeState(api.applyId, '대기')}
                  >
                    대기
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => changeState(api.applyId, '승인')}
                  >
                    승인
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => changeState(api.applyId, '진행')}
                  >
                    진행
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => changeState(api.applyId, '거절')}
                  >
                    거절
                  </button>
                </li>
              </ul>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="custom-container">
      <p className="color-blue text-xl font-bold w-40 m-0">API 신청내역</p>
      <div className="flex justify-arouond w-full mt-8">
        <div className="border-right w-1/6 flex flex-col justify-center items-center text-center my-4">
          <button
            type="button"
            // className="my-4"
            className={
              selectedItem === '전체 조회' ? 'selected' : 'no-selected'
            }
            onClick={() => handleItemClick('전체 조회')}
          >
            전체 조회
          </button>
          <button
            type="button"
            className={
              selectedItem === '승인 조회' ? 'selected' : 'no-selected'
            }
            onClick={() => handleItemClick('승인 조회')}
          >
            승인 조회
          </button>
          <button
            type="button"
            className={
              selectedItem === '대기 조회' ? 'selected' : 'no-selected'
            }
            onClick={() => handleItemClick('대기 조회')}
          >
            대기 조회
          </button>
          <button
            type="button"
            className={
              selectedItem === '진행 조회' ? 'selected' : 'no-selected'
            }
            onClick={() => handleItemClick('진행 조회')}
          >
            진행 조회
          </button>
          <button
            type="button"
            className={
              selectedItem === '거절 조회' ? 'selected' : 'no-selected'
            }
            onClick={() => handleItemClick('거절 조회')}
          >
            거절 조회
          </button>
          {/* <p className="my-4">승인 조회</p>
          <p className="my-4">대기 조회</p>
          <p className="my-4">진행 조회</p>
          <p className="my-4">거절 조회</p> */}
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
          {rejectState ? 'reject' : ''}
        </div>
      </div>
    </div>
  );
}

export default ApiApproval;
