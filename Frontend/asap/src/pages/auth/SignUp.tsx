import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import 'styles/auth/SignUp.scss';
import useSignUp from 'hooks/api/auth/useSignUp';
import useCheckId from 'hooks/api/auth/useCheckId';
import { Input, Button } from '@material-tailwind/react';
import useAuthEmail from 'hooks/api/auth/useAuthEmail';
import Timer from 'components/auth/Timer';

interface ITime {
  mm: number;
  ss: number;
}

function SignUp() {
  const { signUp } = useSignUp();
  const { isIdAvailable, setIsIdAvailable, checkIdAvailability } = useCheckId();
  const {
    postEmail,
    checkEmailCode,
    postedEmail,
    checkedCode,
    resetEmailStatus,
  } = useAuthEmail();

  const [userId, setUserId] = useState<string>('');

  const [userPassword, setUserPassword] = useState<string>('');
  const [userConfirmPassword, setUserConfirmPassword] = useState<string>('');

  // 비밀 번호 조건
  const hasUpperCase = /[A-Z]/.test(userPassword);
  const hasLowerCase = /[a-z]/.test(userPassword);
  const hasNumber = /[0-9]/.test(userPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(userPassword);
  const isLengthValid = userPassword.length >= 8 && userPassword.length <= 16;

  const [userName, setUserName] = useState<string>('');

  const [userEmail, setUserEmail] = useState<string>('');
  const [emailCode, setEmailCode] = useState<string>('');
  const [initialTime, setInitialTime] = useState<ITime>({ mm: 0, ss: 0 });
  const [timerKey, setTimerKey] = useState<number>(0);

  // 아이디 입력
  const onIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsIdAvailable(false);
    setUserId(event.target.value);
  };

  // 아이디 중복 확인 버튼 클릭
  const onIdCheckHandler = async () => {
    await checkIdAvailability(userId);
  };

  // 비밀 번호 입력
  const onPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };

  // 비밀 번호 확인 입력
  const onConfirmPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserConfirmPassword(event.target.value);
  };

  // 비밀 번호 조건 확인 메시지
  const passwordMessage = () => {
    if (
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber ||
      !hasSpecialChar ||
      !isLengthValid
    ) {
      return (
        <p className="my-2 ms-1 text-red-600">
          비밀번호는 대소문자/숫자/특수문자 혼용 8자이상 16자 이하로
          입력해주세요.
        </p>
      );
    }

    return <p className="my-2 ms-1 text-blue">사용 가능한 비밀번호입니다.</p>;
  };

  // 비밀번호 확인 체크 메시지
  const passwordCheckMessage = () => {
    if (!userPassword || !userConfirmPassword) {
      return null;
    }
    if (userPassword === userConfirmPassword) {
      return <p className="my-2 ms-1 text-blue">비밀번호가 일치합니다.</p>;
    }
    return (
      <p className="my-2 ms-1 text-red-600">비밀번호가 일치하지 않습니다.</p>
    );
  };

  // 이름 입력
  const onNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  // 이메일 입력
  const onEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  // 이메일 인증 코드 전송
  const onPostEmailCode = async () => {
    resetEmailStatus();
    if (!userEmail) {
      alert('이메일을 입력해주세요');
      return;
    }
    await postEmail(userEmail);
    setInitialTime({ mm: 5, ss: 0 });
    setTimerKey((prevKey) => prevKey + 1);
  };

  // 인증 코드 입력
  const onEmailCodeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailCode(event?.target.value);
  };

  // 인증 코드 확인
  const onCheckEmailCode = async () => {
    await checkEmailCode({ email: userEmail, code: emailCode });
  };

  // 타이머 출력
  const codeTimer = () => {
    if (initialTime.mm === 0 && initialTime.ss === 0) {
      return null;
    }
    if (postedEmail && !checkedCode) {
      return <Timer key={timerKey} mm={initialTime.mm} ss={initialTime.ss} />;
    }
    return null;
  };

  const onsubmitHandler = async () => {
    if (!isIdAvailable) {
      alert('아이디를 다시 확인해주세요.');
      return;
    }

    if (
      userPassword !== userConfirmPassword ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber ||
      !hasSpecialChar ||
      !isLengthValid
    ) {
      alert('비밀번호를 다시 확인해주세요.');
      return;
    }

    if (!userName) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!checkedCode) {
      alert('이메일 인증을 확인해주세요.');
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
    <div className="container mx-auto form-container page-container">
      <div className="flex justify-center my-8">
        <p className="font-bold text-6xl text-blue">Sign Up</p>
      </div>

      {/* 아이디 입력 */}
      <div className="mb-7">
        <p className="text-lg font-extrabold text-blue">아이디</p>
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
              className="!absolute right-1 top-1 rounded btn-width"
              ripple={false}
              style={{ cursor: 'auto' }}
            >
              아이디 중복 확인
            </Button>
          ) : (
            <Button
              size="sm"
              color={userId ? 'gray' : 'blue-gray'}
              disabled={!userId}
              className="!absolute right-1 top-1 rounded btn-width"
              onClick={onIdCheckHandler}
            >
              아이디 중복 확인
            </Button>
          )}
        </div>
      </div>

      {/* 비밀번호 입력 */}
      <div className="mb-7">
        <p className="text-lg font-extrabold text-blue">비밀번호</p>
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
          {passwordMessage()}
          {passwordCheckMessage()}
        </div>
      </div>

      {/* 이름 입력 */}
      <div className="mb-7">
        <p className="text-lg font-extrabold text-blue">이름</p>
        <div className="my-3">
          <Input
            label="이름"
            value={userName}
            onChange={onNameHandler}
            crossOrigin=""
          />
        </div>
      </div>

      {/* 이메일 입력 */}
      <p className="text-lg font-extrabold text-blue">이메일</p>
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
        {postedEmail ? (
          <Button
            size="sm"
            color="blue"
            disabled={!userEmail}
            className="!absolute right-1 top-1 rounded btn-width"
            onClick={onPostEmailCode}
          >
            인증 코드 재전송
          </Button>
        ) : (
          <Button
            size="sm"
            color={userEmail ? 'gray' : 'blue-gray'}
            disabled={!userEmail}
            className="!absolute right-1 top-1 rounded btn-width"
            onClick={onPostEmailCode}
          >
            인증 코드 전송
          </Button>
        )}
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
        <div className="flex !absolute right-1 top-1">
          {codeTimer()}
          {checkedCode ? (
            <Button
              size="sm"
              color="blue"
              disabled={!emailCode}
              className="rounded btn-width"
              onClick={onCheckEmailCode}
            >
              인증 완료
            </Button>
          ) : (
            <Button
              size="sm"
              color={emailCode ? 'gray' : 'blue-gray'}
              disabled={!emailCode}
              className="rounded btn-width"
              onClick={onCheckEmailCode}
            >
              인증 코드 확인
            </Button>
          )}
        </div>
      </div>
      {/* 회원가입 버튼 */}
      <div className="flex justify-center my-9">
        <Button ripple onClick={onsubmitHandler} className="bg-blue btn-width">
          회원 가입
        </Button>
      </div>

      <hr className="line-blue" />

      <div className="flex justify-center my-5">
        <p className="text-xl text-gray-500 font-bold me-3">
          이미 회원이신가요 ?
        </p>
        <Link to="/login" className="text-xl font-bold text-blue">
          Login
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
