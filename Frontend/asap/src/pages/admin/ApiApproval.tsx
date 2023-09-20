import React, { useState } from 'react';
import 'styles/admin/apiApproval.scss';

import useAdminApiList from 'hooks/api/admin/useAdminApiList';
import useAdminApiProgress from 'hooks/api/admin/useAdminApiProgress';
import useAdminApiRejectReason from 'hooks/api/admin/useAdminApiRejectReason';
import useAdminApiDetail from 'hooks/api/admin/useAdminApiDetail';

import Header from 'components/common/Header';
import Modal from 'components/common/Modal';

function ApiApproval() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { apis, setLastChanged } = useAdminApiList();
  const { adminApiProgress } = useAdminApiProgress();
  const [stateApis, setStateApis] = useState(apis);
  const { adminApiRejectReason } = useAdminApiRejectReason();
  const { adminApiDetail, apiDetail } = useAdminApiDetail();

  const [selectedItem, setSelectItem] = useState('전체 조회');
  const handleItemClick = (item: string) => {
    setSelectItem(item);
    setStateApis(apis.filter((api) => api.progress === item.slice(0, 2)));
  };

  const [nowApiId, setNowApiId] = useState(-1);
  const [nowApiTitle, setNowApiTitle] = useState('');
  const [rejectState, setRejectState] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const handleRejectState = async () => {
    adminApiRejectReason({
      applyId: nowApiId,
      title: nowApiTitle,
      content: rejectReason,
    });
    setRejectState(false);
    closeModal();
    window.location.reload();
  };
  const handleRejectReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setRejectReason(e.target.value);
  };

  const changeState = (applyId: number, newState: string) => {
    const doChange = async () => {
      console.log(applyId, newState);
      adminApiProgress({ applyId, progress: newState });
      // await adminApiList();
      await setLastChanged(new Date().getTime());
      if (newState === '거절') {
        setRejectState(true);
        openModal();
      } else {
        window.location.reload();
      }
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
  const handleClick = (applyId: number, title: string) => {
    setClickedApi(applyId);
    setClicked(!clicked);
    setNowApiId(applyId);
    setNowApiTitle(title);
  };

  // const [detailApplyId, setDetailApplyId] = useState(-1);
  const showDetail = async (applyId: number) => {
    console.log(applyId);
    adminApiDetail(applyId);
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
        <div
          role="button"
          tabIndex={0}
          className="col-span-3 text-center font-medium"
          onClick={() => showDetail(api.applyId)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Space') {
              showDetail(api.applyId);
            }
          }}
        >
          {api.title}
        </div>
        {Object.keys(apiDetail).length === 0 ? (
          ''
        ) : (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="flex flex-col justify-center content-center font-semibold">
              <div>
                {/* API 이름 부분 */}
                <div className="flex">
                  <p>API명 </p>
                  <p>API 이름 출력할 부분</p>
                </div>
                {/* API 상세 설명 부분 */}
                <div className="flex">
                  <p>상세 설명</p>
                  <p>상세 설명 출력할 부분</p>
                </div>
                {/* API 주소 부분 */}
                <div className="flex">
                  <p>API </p>
                  <p>API 주소 출력할 부분</p>
                </div>
                {/* 태그 부분 */}
                <div className="flex">
                  <p>태그</p>
                  <p>태그 출력할 부분</p>
                </div>
                {/* 인풋 부분 */}
                <div className="flex">
                  <p>INPUT</p>
                  <p>인풋 출력할 부분</p>
                </div>
                {/* 아웃풋 부분 */}
                <div className="flex">
                  <p>OUTPUT</p>
                  <p>아웃풋 출력할 부분</p>
                </div>
                {/* 제공 신청 날짜 */}
                <div className="flex">
                  <p>신청 날짜</p>
                  <p>신청 날짜 출력할 부분</p>
                </div>
                {/* 제공 마감 날짜 */}
                <div className="flex">
                  <p>제공 마감 날짜</p>
                  <p>제공 날짜 출력할 부분</p>
                </div>
              </div>
            </div>
          </Modal>
        )}
        <div className="col-span-1 text-center">
          <button
            type="button"
            onClick={() => {
              if (api.progress !== '승인' && api.progress !== '거절') {
                handleClick(api.applyId, api.title);
              }
            }}
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
          <button
            type="button"
            onClick={() => handleClick(api.applyId, api.title)}
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

  return (
    <div>
      <Header title="API 신청내역" />

      <div className="flex justify-arouond w-full mt-8">
        <div className="border-right w-1/6 flex flex-col justify-center items-center text-center my-4">
          <button
            type="button"
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
          {rejectState ? (
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <div className="flex flex-col justify-center content-center font-semibold">
                <p>거절 사유를 입력하세요</p>
                <textarea
                  className="rejectTextarea"
                  onChange={(e) => handleRejectReason(e)}
                />
                <button
                  type="button"
                  onClick={handleRejectState}
                  className="rejectButton"
                >
                  완료
                </button>
              </div>
            </Modal>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default ApiApproval;
