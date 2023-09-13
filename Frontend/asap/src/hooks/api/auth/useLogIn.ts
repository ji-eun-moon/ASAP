import axios from 'axios';

interface LoginInfo {
  id: string;
  password: string;
  loginType: string;
}

const useLogIn = () => {
  const logIn = async ({ id, password }: LoginInfo) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://j9c202.p.ssafy.io/api/v1/member/login',
        data: { id, password },
      });
      sessionStorage.setItem('authToken', response.data);
      //   서버에서 받은 응답 처리
      if (response.status === 200) {
        console.log('로그인 성공:', response.data);
      } else {
        console.error('로그인 실패:', response.data);
      }
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  return { logIn };
};

export default useLogIn;
