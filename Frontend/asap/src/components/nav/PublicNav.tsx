import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuthStore from 'store/auth/useAuthStore';
import { Menu, MenuHandler, MenuList } from '@material-tailwind/react';
import { ReactComponent as Search } from 'assets/icons/Search.svg';
import { ReactComponent as MyPage } from 'assets/icons/MyPage.svg';
import logoImage from 'assets/images/logo2.png';
import NoticeBadge from 'components/notice/NoticeBadge';
import DropDown from './MyPageDrop';
import Switch from './Switch';

const activeStyle = {
  color: '#004096',
  fontWeight: '700',
  textDecoration: 'underline',
  textDecorationThickness: '4px',
  textUnderlinePosition: 'under',
  textUnderlineOffset: '23px',
};

function PublicNav() {
  const { isLoggedIn } = useAuthStore((state) => state);

  return (
    <div>
      <div className="bg-gray-50 flex h-full items-center relative">
        <Link to="/">
          <img src={logoImage} alt="asap logo" className="h-20 w-50 ms-2" />
        </Link>

        <div className="flex justify-center gap-20 w-full absolute">
          <NavLink
            to="/api_list"
            className="font-bold text-xl"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            APIs
          </NavLink>
          <NavLink
            to="/myapi"
            className="font-bold text-xl"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            MyAPI
          </NavLink>
          <NavLink
            to="/help"
            className="font-bold text-xl"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            고객 지원
          </NavLink>
        </div>

        <div className="flex items-center absolute -right-0">
          {/* 계정 전환 Switch */}
          <Switch />

          {/* 알림 뱃지 */}
          {isLoggedIn && <NoticeBadge />}

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
                <DropDown />
              </MenuList>
            </Menu>
          ) : (
            <Link to="/login">
              <div className="bg-skyblue w-20 h-20 flex items-center justify-center text-white font-bold">
                LOGIN
              </div>
            </Link>
          )}
          <button
            type="button"
            className="bg-blue w-20 h-20 flex items-center justify-center text-white font-bold"
          >
            <Search className="w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublicNav;
