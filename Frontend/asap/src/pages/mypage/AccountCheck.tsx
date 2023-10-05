import React, { useState, ChangeEvent } from 'react';
import { Input, Button } from '@material-tailwind/react';
import useCheckPw from 'hooks/api/auth/useCheckPw';

function AccountCheck() {
  const { checkPw, checkedPw } = useCheckPw();
  const [userPassword, setUserPassword] = useState<string>('');
  const onPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };

  const onSubmitHandler = async () => {
    if (!userPassword) {
      alert('비밀번호를 입력해주세요');
      return;
    }
    await checkPw({ password: userPassword });
    if (!checkedPw) {
      setUserPassword('');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="font-extrabold text-4xl mb-3 color-blue">
        비밀번호 확인
      </div>
      <div className="my-6 text-lg">
        <div>인증이 필요한 페이지입니다.</div>
        <div>비밀번호 입력 후 확인 버튼을 클릭해 주세요.</div>
      </div>
      <div className="flex gap-4">
        <div>
          <Input
            label="비밀번호"
            value={userPassword}
            type="password"
            onChange={onPasswordHandler}
            className="pr-20"
            containerProps={{
              className: 'min-w-0',
            }}
            crossOrigin=""
          />
        </div>
        <div className="flex justify-center">
          <Button ripple onClick={onSubmitHandler} className="btn-width">
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AccountCheck;
