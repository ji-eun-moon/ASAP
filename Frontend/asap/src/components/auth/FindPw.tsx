import React from 'react';
import useFindPw from 'hooks/api/auth/useFindPw';

function FindPw() {
  const { findPw } = useFindPw();

  const onFindPw = async (email: string, id: string) => {
    await findPw({ email, id });
  };

  return (
    <div>
      FindPw
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={() => onFindPw('mjieun0956@gmail.com', 'moon')}
      >
        비밀번호 찾기 테스트
      </button>
    </div>
  );
}

export default FindPw;
