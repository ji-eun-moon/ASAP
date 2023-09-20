import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuthStore from 'store/auth/useAuthStore';
import { Menu, MenuHandler, MenuList } from '@material-tailwind/react';
import { ReactComponent as Search } from 'assets/icons/Search.svg';
import { ReactComponent as MyPage } from 'assets/icons/MyPage.svg';
import MyPageDrop from './MyPageDrop';

const activeStyle = {
  color: '#004096',
  fontWeight: '700',
  textDecoration: 'underline',
  textDecorationThickness: '4px',
  textUnderlinePosition: 'under',
  textUnderlineOffset: '23px',
};

function SupplierNav() {
  const { isLoggedIn } = useAuthStore((state) => state);

  return (
    <div className="h-20 bg-gray-50">
      <div className="h-full items-center flex">
        <Link to="/">
          <img
            src="/assets/images/logo.png"
            alt="asap logo"
            className="h-20 w-40 ms-2"
          />
        </Link>

        <div className="flex justify-center gap-20 w-full">
          {/* 내가 제공 중인 API 통계로 이동 */}
          <NavLink
            to="/myapi"
            className="font-bold text-xl"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My API
          </NavLink>
          {/* API 신청 리스트로 이동 */}
          <NavLink
            to="/supply"
            className="font-bold text-xl"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            API 신청
          </NavLink>
          {/* 고객 지원 페이지로 이동 */}
          <NavLink
            to="/help"
            className="font-bold text-xl"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            고객 지원
          </NavLink>
        </div>
        <div className="flex justify-end">
          {isLoggedIn ? (
            <Menu placement="top-start">
              <MenuHandler>
                <button
                  type="button"
                  className="bg-skyblue w-20 h-20 flex items-center justify-center text-white font-bold"
                >
                  <MyPage className="w-5" />
                </button>
              </MenuHandler>
              <MenuList>
                <MyPageDrop />
              </MenuList>
            </Menu>
          ) : (
            <Link to="/login">
              <div className="bg-skyblue w-20 h-20 flex items-center justify-center text-white font-bold">
                LOGIN
              </div>
            </Link>
          )}
          <div className="bg-blue w-20 h-20 flex items-center justify-center text-white font-bold">
            <Search className="w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplierNav;
