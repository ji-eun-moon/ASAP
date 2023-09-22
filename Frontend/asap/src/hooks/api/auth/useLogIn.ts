import axios from 'axios';

interface LoginInfo {
  id: string;
  password: string;
  loginType: string;
}

const useLogIn = () => {
  const logIn = async ({ id, password, loginType }: LoginInfo) => {
    const prevLocation = sessionStorage.getItem('prevLocation');
    const defaultRedirect = '/';
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://j9c202.p.ssafy.io/api/v1/member/login',
        data: { id, password },
      });
      sessionStorage.setItem('authToken', response.data);
      sessionStorage.setItem('loginType', loginType);
      sessionStorage.removeItem('prevLocation');
      //   서버에서 받은 응답 처리
      if (response.data === 'USER_ID_NOT_FOUND') {
        console.error('로그인 실패:', response.data);
      } else if (response.data === 'PASSWORD_NOT_AUTHORIZED') {
        console.error('로그인 실패:', response.data);
      } else {
        console.log('로그인 성공:', response.data);
        window.location.replace(prevLocation || defaultRedirect);
      }
    } catch (error) {
      alert('아이디와 비밀번호를 다시 확인해주세요');
    }
  };

  return { logIn };
};

export default useLogIn;
