import React from 'react';

// main
import MainPage from 'pages/main/MainPage';

// account
import SignUp from 'pages/auth/SignUp';
import LogIn from 'pages/auth/LogIn';
import FindAccount from 'pages/auth/FindAccount';
import ChangePw from 'pages/auth/ChangePw';

// api
import ApiList from 'pages/api/ApiList';
import ApiDetail from 'pages/api/ApiDetail';
import ApiUsage from 'pages/api/ApiUsage';
import ApiTest from 'pages/api/ApiTest';
import ApiApply from 'pages/api/ApiApply';

// supply
import ApiSupply from 'pages/api/ApiSupply';
import ApiSupplyList from 'pages/api/ApiSupplyList';

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

// notice
import NoticeList from 'components/notice/NoticeList';

interface Route {
  path: string;
  element: React.ReactElement;
}

const routes: Route[] = [
  { path: '/', element: <MainPage /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/login', element: <LogIn /> },
  { path: '/find_account', element: <FindAccount /> },
  { path: '/change_password', element: <ChangePw /> },

  { path: '/api_list', element: <ApiList /> },
  { path: '/api_list/:apiId', element: <ApiDetail /> },
  { path: '/api_list/:apiId/usage', element: <ApiUsage /> },
  { path: '/api_list/:apiId/test', element: <ApiTest /> },
  { path: '/api_list/:apiId/apply', element: <ApiApply /> },

  { path: '/supply', element: <ApiSupply /> },
  { path: '/supply/list', element: <ApiSupplyList /> },

  { path: '/myapi', element: <MyApi /> },

  { path: '/help', element: <HelpPage /> },

  { path: '/mypage/check', element: <AccountCheck /> },
  { path: '/mypage/account', element: <AccountInfo /> },
  { path: '/mypage/account/modify', element: <AccountMod /> },
  { path: '/mypage/keys', element: <AccountKey /> },
  { path: '/mypage/payment', element: <AccountPay /> },

  { path: '/admin', element: <AdminLogin /> },
  { path: '/admin/approval', element: <ApiApproval /> },
  { path: '/notice', element: <NoticeList /> },
];

export default routes;
