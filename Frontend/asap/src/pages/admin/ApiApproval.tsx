import React, { useEffect, useState } from 'react';
import useAdminApiList from 'hooks/api/admin/useAdminApiList';
import useAdminApiProgress from 'hooks/api/admin/useAdminApiProgress';
import { Button } from '@material-tailwind/react';

function ApiApproval() {
  const { adminApiList } = useAdminApiList();
  const { adminApiProgress } = useAdminApiProgress();
  const [progressStatus, setProgressStatus] = useState('waiting');

  console.log(adminApiList);
  console.log(adminApiProgress);

  const onProgressStatusHandler = (status: string) => {
    setProgressStatus(status);
  };

  useEffect(() => {
    adminApiProgress({ idx: 1, status: progressStatus });
  }, [progressStatus, adminApiProgress]);
  return (
    <div>
      <h1>API 신청내역</h1>
      <Button onClick={() => onProgressStatusHandler('waiting')}>대기</Button>
      <Button onClick={() => onProgressStatusHandler('progress')}>진행</Button>
      <Button onClick={() => onProgressStatusHandler('reject')}>거절</Button>
    </div>
  );
}

export default ApiApproval;
