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
import ApiSupplySubmit from 'pages/api/ApiSupplySubmit';
import ApiSupplyList from 'pages/api/ApiSupplyList';
import SupplyApplyList from 'pages/supply/SupplyApplyList';

// myapi
import MyApi from 'pages/myapi/MyApi';

// help
import HelpPage from 'pages/help/HelpPage';

// mypage
import AccountCheck from 'pages/mypage/AccountCheck';
import AccountInfo from 'pages/mypage/AccountInfo';
import AccountMod from 'pages/mypage/AccountMod';
import AccountKey from 'pages/mypage/AccountKey';
import AccountCredit from 'pages/mypage/AccountCredit';
import AccountPay from 'pages/mypage/AccountPay';

// admin
import AdminLogin from 'pages/admin/AdminLogin';
import ApiApproval from 'pages/admin/ApiApproval';

// Not Found
import NotFound from 'components/common/NotFound';

// Route Restrict
import ToggleAuth from 'pages/auth/ToggleAuth';
import NoSplRoute from 'router/route/NoSplRoute';
import PublicRoute from '../route/PublicRoute';
import PrivateRoute from '../route/PrivateRoute';
import SupplierRoute from '../route/SupplierRoute';
import UserRoute from '../route/UserRoute';
import AdminRoute from '../route/AdminRoute';
import AnyRoute from '../route/AnyRoute';

interface Route {
  path: string;
  element: React.ReactElement;
}

const routes: Route[] = [
  {
    path: '/',
    element: (
      <AnyRoute>
        <MainPage />
      </AnyRoute>
    ),
  },

  // auth
  {
    path: '/signup',
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LogIn />
      </PublicRoute>
    ),
  },
  {
    path: '/find_account',
    element: (
      <PublicRoute>
        <FindAccount />
      </PublicRoute>
    ),
  },
  {
    path: '/change_password',
    element: (
      <PrivateRoute>
        <ChangePw />
      </PrivateRoute>
    ),
  },
  {
    path: '/change_account',
    element: (
      <PrivateRoute>
        <ToggleAuth />
      </PrivateRoute>
    ),
  },

  // user
  {
    path: '/api_list',
    element: (
      <NoSplRoute>
        <ApiList />
      </NoSplRoute>
    ),
  },
  {
    path: '/api_list/:apiId',
    element: (
      <NoSplRoute>
        <ApiDetail />
      </NoSplRoute>
    ),
  },
  {
    path: '/api_list/:apiId/usage',
    element: (
      <NoSplRoute>
        <ApiUsage />
      </NoSplRoute>
    ),
  },
  {
    path: '/api_list/:apiId/test',
    element: (
      <UserRoute>
        <ApiTest />
      </UserRoute>
    ),
  },
  {
    path: '/api_list/:apiId/apply',
    element: (
      <UserRoute>
        <ApiApply />
      </UserRoute>
    ),
  },

  // supplier
  {
    path: '/supply',
    element: (
      <SupplierRoute>
        <ApiSupplyList />
      </SupplierRoute>
    ),
  },
  {
    path: '/supply/submit',
    element: (
      <SupplierRoute>
        <ApiSupplySubmit />
      </SupplierRoute>
    ),
  },
  {
    path: '/supply/apply_list',
    element: (
      <SupplierRoute>
        <SupplyApplyList />
      </SupplierRoute>
    ),
  },

  // 통계
  {
    path: '/myapi',
    element: (
      <PrivateRoute>
        <MyApi />
      </PrivateRoute>
    ),
  },

  // 고객 지원
  {
    path: '/help',
    element: (
      <AnyRoute>
        <HelpPage />
      </AnyRoute>
    ),
  },

  {
    path: '/mypage/check',
    element: (
      <PrivateRoute>
        <AccountCheck />
      </PrivateRoute>
    ),
  },
  {
    path: '/mypage/account',
    element: (
      <PrivateRoute>
        <AccountInfo />
      </PrivateRoute>
    ),
  },
  {
    path: '/mypage/account/modify',
    element: (
      <PrivateRoute>
        <AccountMod />
      </PrivateRoute>
    ),
  },
  {
    path: '/mypage/keys',
    element: (
      <PrivateRoute>
        <AccountKey />
      </PrivateRoute>
    ),
  },
  {
    path: '/mypage/credit',
    element: (
      <PrivateRoute>
        <AccountCredit />
      </PrivateRoute>
    ),
  },
  {
    path: '/mypage/payment',
    element: (
      <PrivateRoute>
        <AccountPay />
      </PrivateRoute>
    ),
  },

  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminLogin />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/approval',
    element: (
      <AdminRoute>
        <ApiApproval />
      </AdminRoute>
    ),
  },

  { path: '/*', element: <NotFound /> },
];

export default routes;
