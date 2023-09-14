import axios from 'axios';

interface IFindPw {
  email: string;
  id: string;
}

const useFindPw = () => {
  const findPw = async ({ email, id }: IFindPw) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://j9c202.p.ssafy.io/api/v1/member/find-password',
        data: { email, id },
      });
      console.log(response.data);
      // 서버에서 받은 응답 처리
      if (response.status === 200) {
        console.log('비밀번호 변경 메일 전송 성공');
      }
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  return { findPw };
};

export default useFindPw;
