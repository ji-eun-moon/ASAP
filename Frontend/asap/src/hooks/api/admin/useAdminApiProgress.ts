import axios from 'axios';

interface postInfo {
  idx: number;
  status: string;
}
const useAdminApiProgress = () => {
  const adminApiProgress = async ({ idx, status }: postInfo) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://j9c202.p.ssafy.io:9000/api/v1/apply/progress',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6InN0cmluZyIsImlhdCI6MTY5NDU4NjUyMSwiZXhwIjoxNjk0NTg2NjA3fQ.vTpyRNJm0Ydb548t9F0P4B_7Gi24TQDS3MTMG4CR7QH2FYI0tCw4cfbFHMbAahI6mXaqmXJOXO8DOUZPar2xQQ',
        },
        data: {
          idx,
          status,
        },
      });
      if (response.status === 200) {
        console.log('진행 상태 변경 완료');
      } else {
        console.log('진행 상태 변경 실패');
      }
    } catch (error) {
      console.log('서버 오류', error);
    }
  };
  return { adminApiProgress };
};

export default useAdminApiProgress;
