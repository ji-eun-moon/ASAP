import React, { useState, useEffect, ChangeEvent } from 'react';
import useLogIn from 'hooks/api/auth/useLogIn';
import { Input, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

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

  // 로그인 페이지에서 body 색상 변경
  useEffect(() => {
    document.body.classList.add('login-page-body');
    return () => {
      document.body.classList.remove('login-page-body');
    };
  }, []);

  return (
    <div className="container mx-auto form-container page-container bg-blue">
      <div className="flex justify-center my-8">
        <p className="font-bold text-6xl text-gray-50">LogIn</p>
      </div>
      <p className="text-lg font-extrabold text-gray-50">아이디</p>
      <Input
        label="아이디"
        value={userId}
        onChange={onIdHandler}
        className="pr-20"
        containerProps={{
          className: 'min-w-0',
        }}
        color="white"
        crossOrigin=""
      />
      <p className="text-lg font-extrabold text-gray-50">비밀번호</p>
      <Input
        label="비밀번호"
        value={userPassword}
        type="password"
        onChange={onPasswordHandler}
        className="pr-20"
        containerProps={{
          className: 'min-w-0',
        }}
        color="white"
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
      <div className="flex justify-center my-5">
        <p className="text-xl text-gray-500 font-bold me-3">
          아직 회원이 아니신가요?
        </p>
        <Link to="/signup" className="text-xl font-bold text-blue">
          Signup
        </Link>
      </div>
      <div className="flex justify-center">
        <Link to="/find_account">아이디, 비밀번호 찾기</Link>
      </div>
    </div>
  );
}

export default LogIn;
