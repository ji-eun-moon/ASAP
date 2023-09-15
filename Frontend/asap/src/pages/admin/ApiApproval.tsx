import React, { useState } from 'react';
import useAdminApiList from 'hooks/api/admin/useAdminApiList';
import useAdminApiProgress from 'hooks/api/admin/useAdminApiProgress';
import useAdminApiDelete from 'hooks/api/admin/useAdminApiDelete';
import { Button } from '@material-tailwind/react';

function ApiApproval() {
  const { adminApiList } = useAdminApiList();
  const { adminApiProgress } = useAdminApiProgress();
  const { adminApiDelete } = useAdminApiDelete();
  const [progressStatus, setProgressStatus] = useState<string>('대기');

  // console.log(adminApiList);
  // console.log(adminApiProgress);

  const onProgressStatusHandler = (status: string) => {
    setProgressStatus(status);
    console.log(status);
  };
  const go = async () => {
    await adminApiProgress({ applyId: 1, progress: progressStatus });
  };

  // const changeProgress = async () => {
  //   await adminApiProgress({ applyId: 1, progress: '진행' });
  // };

  // useEffect(() => {
  //   adminApiProgress({ idx: 1, status: progressStatus });
  // }, [progressStatus, adminApiProgress]);
  return (
    <div>
      <h1>API 신청내역</h1>
      <Button onClick={adminApiList}>API 신청 내역 조회</Button>

      <Button onClick={() => onProgressStatusHandler('대기')}>대기</Button>
      <Button onClick={() => onProgressStatusHandler('진행')}>진행</Button>
      <Button onClick={() => onProgressStatusHandler('거절')}>거절</Button>
      <Button onClick={() => onProgressStatusHandler('완료')}>완료</Button>
      <Button onClick={() => go()}>API 상태 변경 확인</Button>
      {/* <Button onClick={changeProgress}>API 상태 변경 확인2</Button> */}

      <Button onClick={() => adminApiDelete(123)}>api 삭제</Button>
    </div>
  );
}

export default ApiApproval;
