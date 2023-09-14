import axios from 'axios';
import { useEffect, useState } from 'react';

const useAdminApiList = () => {
  const adminNum = useState(0);
  const adminApiList = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://j9c202.p.ssafy.io:9000/api/v1/apply/list',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6InN0cmluZyIsImlhdCI6MTY5NDU4NjUyMSwiZXhwIjoxNjk0NTg2NjA3fQ.vTpyRNJm0Ydb548t9F0P4B_7Gi24TQDS3MTMG4CR7QH2FYI0tCw4cfbFHMbAahI6mXaqmXJOXO8DOUZPar2xQQ',
        },
        data: {
          adminNum,
        },
      });
      if (response.status === 200) {
        console.log('관리자 api 신청 내역 조회');
      } else {
        console.log('관리자 api 신청 내역 조회 실패');
      }
    } catch (error) {
      console.log('서버오류', error);
    }
  };

  useEffect(() => {
    adminApiList();
  });
  return { adminApiList };
};
export default useAdminApiList;
