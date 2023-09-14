import React from 'react';

// main
import MainPage from 'pages/main/MainPage';

// account
import SignUp from 'pages/auth/SignUp';
import LogIn from 'pages/auth/LogIn';
import FindAccount from 'pages/auth/FindAccount';

// api
import ApiList from 'pages/api/ApiList';
import ApiDetail from 'pages/api/ApiDetail';
import ApiUsage from 'pages/api/ApiUsage';
import ApiTest from 'pages/api/ApiTest';
import ApiApply from 'pages/api/ApiApply';
import ApiSupply from 'pages/api/ApiSupply';

// myapi
import MyApi from 'pages/myapi/MyApi';

// help
import HelpPage from 'pages/help/HelpPage';

// mypage
import AccountCheck from 'pages/mypage/AccountCheck';
import AccountInfo from 'pages/mypage/AccountInfo';
import AccountMod from 'pages/mypage/AccountMod';
import AccountKey from 'pages/mypage/AccountKey';

// admin
import AdminLogin from 'pages/admin/AdminLogin';
import ApiApproval from 'pages/admin/ApiApproval';
import AccountPay from 'pages/mypage/AccountPay';

interface Route {
  path: string;
  element: React.ReactElement;
}

const routes: Route[] = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/find_account',
    element: <FindAccount />,
  },
  {
    path: '/api_list',
    element: <ApiList />,
  },
  {
    path: '/api_list/:api_id',
    element: <ApiDetail />,
  },
  {
    path: '/api_list/:api_id/usage',
    element: <ApiUsage />,
  },
  {
    path: '/api_list/:api_id/test',
    element: <ApiTest />,
  },
  {
    path: '/api_list/:api_id/apply',
    element: <ApiApply />,
  },
  {
    path: '/supply',
    element: <ApiSupply />,
  },
  {
    path: '/myapi',
    element: <MyApi />,
  },
  {
    path: '/help',
    element: <HelpPage />,
  },
  {
    path: '/mypage/check',
    element: <AccountCheck />,
  },
  {
    path: '/mypage/account',
    element: <AccountInfo />,
  },
  {
    path: '/mypage/account/modify',
    element: <AccountMod />,
  },
  {
    path: '/mypage/keys',
    element: <AccountKey />,
  },
  {
    path: '/mypage/payment',
    element: <AccountPay />,
  },
  {
    path: '/admin',
    element: <AdminLogin />,
  },
  {
    path: '/admin/approval',
    element: <ApiApproval />,
  },
];

export default routes;