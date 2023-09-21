import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';

function Switch() {
  const { isLoggedIn, loginType } = useAuthStore((state) => state);

  const setLoginType = (newLoginType: string) => {
    sessionStorage.setItem('loginType', newLoginType);
  };

  const data = [
    {
      label: '사용자',
      value: 'user',
    },
    {
      label: '제공자',
      value: 'supplier',
    },
  ];

  if (isLoggedIn) {
    return (
      <Tabs value={loginType} className="w-52 me-3">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value} onClick={() => setLoginType(value)}>
              <p className="font-bold">{label}</p>
            </Tab>
          ))}
        </TabsHeader>
      </Tabs>
    );
  }

  return null;
}

export default Switch;
