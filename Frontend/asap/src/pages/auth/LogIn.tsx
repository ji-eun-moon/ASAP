import React, { useState, ChangeEvent } from 'react';
import useLogIn from 'hooks/api/auth/useLogIn';
import { Input, Button } from '@material-tailwind/react';

function LogIn() {
  const { logIn } = useLogIn();
  const [userId, setUserId] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [loginType, setLoginType] = useState<string>('user');

  const onIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const onPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };

  const onSubmitHandler = async () => {
    if (!userId) {
      alert('아이디를 입력해주세요.');
      return;
    }
    if (!userPassword) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    await logIn({
      id: userId,
      password: userPassword,
      loginType,
    });
  };

  return (
    <div className="container mx-auto">
      LogIn
      <Input
        label="아이디"
        value={userId}
        onChange={onIdHandler}
        className="pr-20"
        containerProps={{
          className: 'min-w-0',
        }}
        crossOrigin=""
      />
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
      <div>
        <Button
          onClick={() => setLoginType('user')}
          className={`mr-2 ${
            loginType === 'user' ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        >
          사용자로 로그인
        </Button>
        <Button
          onClick={() => setLoginType('provider')}
          className={`mr-2 ${
            loginType === 'provider' ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        >
          제공자로 로그인
        </Button>
      </div>
      {/* 로그인 버튼 */}
      <div className="flex flex-row-reverse">
        <Button ripple onClick={onSubmitHandler}>
          로그인
        </Button>
      </div>
    </div>
  );
}

export default LogIn;
