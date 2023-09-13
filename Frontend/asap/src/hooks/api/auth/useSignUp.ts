import axios from 'axios';

/**
 * 회원 가입
 */

interface UserInfo {
  id: string;
  password: string;
  name: string;
  email: string;
}

const useSignUp = () => {
  const signUp = async ({ id, password, name, email }: UserInfo) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://j9c202.p.ssafy.io/api/v1/member/signup',
        data: { id, password, name, email },
      });
      // 서버에서 받은 응답 처리
      if (response.status === 201) {
        console.log('회원가입 성공:', response.data);
      } else {
        console.error('회원가입 실패:', response.data);
      }
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  return { signUp };
};

export default useSignUp;
