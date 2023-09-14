import React from 'react';
import useNoticeList from 'hooks/api/notice/useNoticeList';
import useDeleteNotice from 'hooks/api/notice/useDeleteNotice';
import useCheckNotice from 'hooks/api/notice/useCheckNotice';
import useCountNotice from 'hooks/api/notice/useCountNotice';

function NoticeList() {
  const { getNoticeList } = useNoticeList();
  const { deleteNotice } = useDeleteNotice();
  const { checkNotice } = useCheckNotice();
  const { getNoticeCount } = useCountNotice();

  const handleCheckNotice = (noticeId: number) => {
    checkNotice(noticeId);
  };

  const handleDeleteNotice = (noticeId: number) => {
    deleteNotice(noticeId);
  };

  return (
    <div>
      NoticeList
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={getNoticeList}
      >
        알림 리스트 받기 테스트
      </button>
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={() => handleCheckNotice(1)}
      >
        알림 읽기 테스트
      </button>
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={() => handleDeleteNotice(1)}
      >
        알림 삭제하기 테스트
      </button>
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={getNoticeCount}
      >
        알림 카운트 테스트
      </button>
    </div>
  );
}

export default NoticeList;
