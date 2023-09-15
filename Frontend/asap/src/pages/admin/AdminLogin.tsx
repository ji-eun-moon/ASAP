import React, { useState, ChangeEvent } from 'react';
import useAdminLogin from 'hooks/api/admin/useAdminLogin';
import { Input, Button } from '@material-tailwind/react';

function AdminLogin() {
  const { adminLogin } = useAdminLogin();
  const [adminId, setAdminId] = useState<string>('');
  const [adminPassword, setAdminPwd] = useState<string>('');

  const onIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAdminId(event.target.value);
  };

  const onPwdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAdminPwd(event.target.value);
  };

  const login = async () => {
    await adminLogin({
      adminId,
      adminPassword,
    });
  };
  return (
    <div>
      <h1>관리자 인증이 필요한 페이지입니다</h1>
      <div>
        <p>아이디</p>
        <Input
          label="아이디"
          value={adminId}
          onChange={onIdHandler}
          className="pr-20"
          containerProps={{
            className: 'min-w-0',
          }}
          crossOrigin=""
        />
        <Input
          label="비밀번호"
          value={adminPassword}
          onChange={onPwdHandler}
          className="pr-20"
          containerProps={{
            className: 'min-w-0',
          }}
          crossOrigin=""
        />
        <Button onClick={login}>로그인</Button>
      </div>
    </div>
  );
}

export default AdminLogin;
