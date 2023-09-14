import useFindId from 'hooks/api/auth/useFindId';
import useFindPw from 'hooks/api/auth/useFindPassWord';
import React from 'react';

function FindAccount() {
  const { findId } = useFindId();
  const { findPw } = useFindPw();

  const onFindId = async (email: string, name: string) => {
    await findId({ email, name });
  };

  const onFindPw = async (email: string, id: string) => {
    await findPw({ email, id });
  };

  return (
    <div>
      FindAccount
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={() => onFindId('email', 'name')}
      >
        아이디 찾기 테스트
      </button>
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={() => onFindPw('email', 'id')}
      >
        비밀번호 찾기 테스트
      </button>
    </div>
  );
}

export default FindAccount;
