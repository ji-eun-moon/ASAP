import React, { useState } from 'react';
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  format,
  parseISO,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { ReactComponent as Read } from 'assets/icons/Read.svg';
import { ReactComponent as Unread } from 'assets/icons/Unread.svg';
import { ReactComponent as Trash } from 'assets/icons/Trash.svg';
import useCheckNotice from 'hooks/api/notice/useCheckNotice';
import useDeleteNotice from 'hooks/api/notice/useDeleteNotice';

interface INotice {
  noticeId: number;
  title: string;
  content: string;
  read: boolean;
  createDate: string;
}

interface Props {
  notice: INotice;
}

function NoticeCard({ notice }: Props) {
  const { checkNotice } = useCheckNotice();
  const { deleteNotice } = useDeleteNotice();

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const toggleDetail = () => {
    setIsDetailOpen(!isDetailOpen);
    if (!notice.read) {
      checkNotice(notice.noticeId);
    }
  };

  const onDeleteNotice = () => {
    deleteNotice(notice.noticeId);
  };

  // 알림 도착 시간
  const timeAgo = () => {
    const currentTime = new Date();
    const parsedCreateDate = parseISO(notice.createDate);
    const minutesAgo = differenceInMinutes(currentTime, parsedCreateDate);
    const hoursAgo = differenceInHours(currentTime, parsedCreateDate);
    const daysAgo = differenceInDays(currentTime, parsedCreateDate);
    if (daysAgo > 0) {
      return (
        <p>{`${format(parsedCreateDate, 'M월 d일', {
          locale: ko,
        })}`}</p>
      );
    }
    if (hoursAgo > 0) {
      return <p>{`${hoursAgo}시간 전`}</p>;
    }
    return <p>{`${minutesAgo}분 전`}</p>;
  };

  return (
    <div className="border p-2">
      <div onClick={toggleDetail} aria-hidden="true" className="cursor-pointer">
        <div className="flex justify-between">
          <div className="flex text-black items-center justify-between mb-2">
            {notice.read ? (
              <Read className="w-6 h-auto" />
            ) : (
              <Unread className="w-6 h-auto" />
            )}
          </div>
          <div className="flex justify-end">{timeAgo()}</div>
        </div>
        <div className="text-black mb-1 ms-1">{notice.title}</div>
      </div>
      {isDetailOpen && (
        <div>
          <hr />
          <div className="ms-1 mt-3">{notice.content}</div>
          <div className="flex justify-end">
            <div
              onClick={onDeleteNotice}
              aria-hidden="true"
              className="cursor-pointer"
            >
              <Trash />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoticeCard;
