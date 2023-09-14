import axios from 'axios';

const useMemberChart = () => {
  const memberChart = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://j9c202.p.ssafy.io:9000/api/v1/member/use-api',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6InN0cmluZyIsImlhdCI6MTY5NDU4ODQ2MCwiZXhwIjoxNjk0NTg4NTQ3fQ.hdqZEIIL8u6B-QEcBuncpFvX_yFxWnXCl7wAXm1NYD4Ohx0U3CkzPOkHAtjUlX9BDWlaot1evYHHcDnQCgLSVA',
        },
      });
      if (response.status === 200) {
        console.log('사용자 통계 정보', response.data);
      } else {
        console.error('사용자 통계 정보 가져오기 실패', response.data);
      }
    } catch (error) {
      console.log('서버 오류', error);
    }
  };
  return { memberChart };
};

export default useMemberChart;
