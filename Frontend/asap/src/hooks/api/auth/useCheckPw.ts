import axiosInstance from 'utils/axiosInstance';
import { useState } from 'react';

interface CheckInfo {
  password: string;
}

const useCheckPw = () => {
  const [checkedPw, setCheckedPw] = useState<boolean>(false);
  const prevLocation = sessionStorage.getItem('prevLocation');
  const defaultRedirect = '/';
  const checkPw = async ({ password }: CheckInfo) => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: '/api/v1/member/check-password',
        data: { password },
      });
      if (response.data === '비밀번호 인증 성공') {
        setCheckedPw(true);
        sessionStorage.setItem('isAuthenticated', 'true');
        window.location.replace(prevLocation || defaultRedirect);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      alert('비밀번호를 다시 입력해주세요.');
    }
  };

  return { checkPw, checkedPw };
};

export default useCheckPw;
