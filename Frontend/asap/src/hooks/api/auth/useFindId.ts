import { useState } from 'react';
import axios from 'axios';

interface IFindId {
  email: string;
  name: string;
}

const useFindId = () => {
  const [idList, setIdList] = useState<IFindId[] | null>();

  const findId = async ({ email, name }: IFindId) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://j9c202.p.ssafy.io/api/v1/member/find-id',
        data: { email, name },
      });
      console.log(response.data);
      // 서버에서 받은 응답 처리
      if (response.status === 200) {
        setIdList(response.data);
        console.log('아이디 찾기 성공');
      } else if (response.status === 404) {
        console.log('아이디 없음');
      }
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  return { findId, idList };
};

export default useFindId;
