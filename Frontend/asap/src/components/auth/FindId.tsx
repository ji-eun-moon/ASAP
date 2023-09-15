import React from 'react';
import useFindId from 'hooks/api/auth/useFindId';

function FindId() {
  const { findId } = useFindId();

  const onFindId = async (email: string, name: string) => {
    await findId({ email, name });
  };

  return (
    <div>
      FindId
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={() => onFindId('mjieun0956@gmail.com', '문지은')}
      >
        아이디 찾기 테스트
      </button>
    </div>
  );
}

export default FindId;
