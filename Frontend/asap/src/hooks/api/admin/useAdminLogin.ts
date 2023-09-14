import axios from 'axios';

const useAdminLogin = () => {
  const adminLogin = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://j9c202.p.ssafy.io:9000/api/v1/admin/login',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6InN0cmluZyIsImlhdCI6MTY5NDU4NjUyMSwiZXhwIjoxNjk0NTg2NjA3fQ.vTpyRNJm0Ydb548t9F0P4B_7Gi24TQDS3MTMG4CR7QH2FYI0tCw4cfbFHMbAahI6mXaqmXJOXO8DOUZPar2xQQ',
        },
      });
      if (response.status === 200) {
        console.log('관리자 로그인 성공');
      } else {
        console.log('관리자 로그인 실패');
      }
    } catch (error) {
      console.error('서버 오류:', error);
    }
  };

  return { adminLogin };
};

export default useAdminLogin;
