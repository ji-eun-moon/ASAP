// SomeComponent.js

import React from 'react';
import useNoticeList from 'hooks/api/notice/useNoticeList';
import NoticeCard from './NoticeCard';

function NoticeList() {
  const { loading, noticeList } = useNoticeList();

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {noticeList?.map((notice) => (
            <NoticeCard key={notice.noticeId} notice={notice} />
          ))}
        </div>
      )}
    </div>
  );
}

export default NoticeList;
