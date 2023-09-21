import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuthStore from 'store/auth/useAuthStore';
import { Menu, MenuHandler, MenuList, Badge } from '@material-tailwind/react';
import { ReactComponent as Search } from 'assets/icons/Search.svg';
import { ReactComponent as MyPage } from 'assets/icons/MyPage.svg';
import DropDown from './MyPageDrop';

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

          <div className="flex justify-end">
            <div className="bg-gray-50 w-20 h-20 flex items-center justify-center">
              <Badge content="5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.5em"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
                </svg>
              </Badge>
            </div>
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
    </div>
  );
}

export default PublicNav;
