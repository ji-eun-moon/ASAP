import React, { useState, ChangeEvent } from 'react';
import useSignUp from 'hooks/api/auth/useSignUp';
import useCheckId from 'hooks/api/auth/useCheckId';
import { Input, Button } from '@material-tailwind/react';

function SignUp() {
  const { signUp } = useSignUp();
  const { isIdAvailable, setIsIdAvailable, checkIdAvailability } = useCheckId();
  const [userId, setUserId] = useState<string>('');

  const [userPassword, setUserPassword] = useState<string>('');
  const [userConfirmPassword, setUserConfirmPassword] = useState<string>('');

  const [userName, setUserName] = useState<string>('');

  const [userEmail, setUserEmail] = useState<string>('');
  const [emailCode, setEmailCode] = useState<string>('');

  const onIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsIdAvailable(false);
    setUserId(event.target.value);
  };

  const onIdCheckHandler = async () => {
    await checkIdAvailability(userId);
  };

  const onPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };

  const onConfirmPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserConfirmPassword(event.target.value);
  };

  // 비밀 번호 조건 확인
  const passwordMessage = () => {
    if (!userPassword) {
      return <p>비밀번호는 필수 입력값입니다.</p>;
    }
    if (userPassword && userPassword === userConfirmPassword) {
      return <p>사용 가능한 비밀번호 입니다.</p>;
    }
    return <p>비밀번호를 확인해주세요.</p>;
  };

  const onNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onEmailHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setUserEmail(event.target.value);

  const onEmailCodeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailCode(event?.target.value);
  };

  const onsubmitHandler = async () => {
    // 회원가입 제출 조건 추가 필요

    // 아이디 중복 확인 후에 회원가입 진행
    if (!isIdAvailable) {
      alert('아이디 중복 확인이 필요합니다.');
      return;
    }

    // 비밀번호와 비밀번호 확인 같지 않으면 회원가입 불가능
    if (userPassword !== userConfirmPassword) {
      alert('비밀번호를 다시 확인해주세요');
      return;
    }

    await signUp({
      id: userId,
      password: userPassword,
      name: userName,
      email: userEmail,
    });
  };
  return (
    <div className="container mx-auto">
      <p className="font-bold">Sign Up</p>

      {/* 아이디 입력 */}
      <p>아이디</p>
      <div className="relative flex w-full my-3">
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
        {isIdAvailable ? (
          <Button
            size="sm"
            color="blue"
            className="!absolute right-1 top-1 rounded"
            ripple={false}
            style={{ cursor: 'auto' }}
          >
            아이디 사용 가능
          </Button>
        ) : (
          <Button
            size="sm"
            color={userId ? 'gray' : 'blue-gray'}
            disabled={!userId}
            className="!absolute right-1 top-1 rounded"
            onClick={onIdCheckHandler}
          >
            아이디 중복확인
          </Button>
        )}
      </div>

      {/* 비밀번호 입력 */}
      <p>비밀번호</p>
      <div className="mt-3">
        <Input
          type="password"
          value={userPassword}
          onChange={onPasswordHandler}
          label="비밀번호"
          crossOrigin=""
        />
      </div>
      <div className="my-3">
        <Input
          type="password"
          value={userConfirmPassword}
          onChange={onConfirmPasswordHandler}
          label="비밀번호 확인"
          crossOrigin=""
        />
        <p>
          비밀번호는 영문자/숫자/특수문자 혼용 8자이상 16자 이하로 입력해주세요.
        </p>
        <p>{passwordMessage()}</p>
      </div>

      {/* 이름 입력 */}
      <p>이름</p>
      <div className="my-3">
        <Input
          label="이름"
          value={userName}
          onChange={onNameHandler}
          crossOrigin=""
        />
      </div>

      {/* 이메일 입력 */}
      <p>이메일</p>
      <div className="relative flex w-full my-3">
        <Input
          type="email"
          label="이메일 주소"
          value={userEmail}
          onChange={onEmailHandler}
          className="pr-20"
          containerProps={{
            className: 'min-w-0',
          }}
          crossOrigin=""
        />
        <Button
          size="sm"
          color={userEmail ? 'gray' : 'blue-gray'}
          disabled={!userEmail}
          className="!absolute right-1 top-1 rounded"
        >
          인증 코드 전송
        </Button>
      </div>
      <div className="relative flex w-full my-3">
        <Input
          type="email"
          label="인증 코드"
          value={emailCode}
          onChange={onEmailCodeHandler}
          className="pr-20"
          containerProps={{
            className: 'min-w-0',
          }}
          crossOrigin=""
        />
        <Button
          size="sm"
          color={emailCode ? 'gray' : 'blue-gray'}
          disabled={!emailCode}
          className="!absolute right-1 top-1 rounded"
        >
          인증 코드 확인
        </Button>
      </div>
      {/* 회원가입 버튼 */}
      <div className="flex flex-row-reverse">
        <Button ripple onClick={onsubmitHandler}>
          회원 가입
        </Button>
      </div>
    </div>
  );
}

export default SignUp;
