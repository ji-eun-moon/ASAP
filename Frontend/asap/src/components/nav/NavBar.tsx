import useLogOut from 'hooks/api/auth/useLogOut';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuthStore from 'store/authStore';

const activeStyle = {
  color: '#004096',
  fontWeight: '700',
};

function NavBar() {
  const { logOut } = useLogOut();
  const { isLoggedIn } = useAuthStore((state) => state);

  return (
    <div>
      <NavLink
        to="/api_list"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        APIs
      </NavLink>
      <NavLink
        to="/myapi"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        MyAPI
      </NavLink>
      <NavLink
        to="/help"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        고객 지원
      </NavLink>
      <Link to="/login">Login</Link>
      {isLoggedIn && (
        <button type="button" style={{ border: '1px solid' }} onClick={logOut}>
          로그아웃
        </button>
      )}
      <hr />
    </div>
  );
}

export default NavBar;
