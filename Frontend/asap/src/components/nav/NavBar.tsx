import useLogOut from 'hooks/api/auth/useLogOut';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuthStore from 'store/authStore';

const activeStyle = {
  color: '#004096',
  fontWeight: '700',
  textDecoration: 'underline',
  textDecorationThickness: '4px',
  textUnderlinePosition: 'under',
  textUnderlineOffset: '23px',
};

function NavBar() {
  const { logOut } = useLogOut();
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
          {isLoggedIn ? (
            <button
              type="button"
              className="bg-skyblue w-20 h-20 flex items-center justify-center text-white font-bold"
              onClick={logOut}
            >
              로그아웃
            </button>
          ) : (
            <Link to="/login">
              <div className="bg-skyblue w-20 h-20 flex items-center justify-center text-white font-bold">
                LOGIN
              </div>
            </Link>
          )}
          <div className="bg-blue w-20 h-20 flex items-center justify-center text-white font-bold">
            검색
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
