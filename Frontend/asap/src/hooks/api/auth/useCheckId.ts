import { useState } from 'react';
import axios from 'axios';

const useCheckId = () => {
  const [isIdAvailable, setIsIdAvailable] = useState<boolean>(false);

  const checkIdAvailability = async (id: string) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://j9c202.p.ssafy.io:9000/api/v1/member/check-id',
        data: { id },
      });
      // 아이디 체크 조건문 수정 필요
      if (response.status === 200) {
        // 중복 아이디가 없는 경우
        setIsIdAvailable(true);
        console.log('아이디 사용 가능');
      } else {
        // 중복 아이디가 있는 경우
        setIsIdAvailable(false);
        console.log('아이디 중복');
      }
    } catch (error) {
      console.error('서버 오류:', error);
    }
  };

  return { isIdAvailable, setIsIdAvailable, checkIdAvailability };
};

export default useCheckId;
