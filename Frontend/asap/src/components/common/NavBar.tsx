import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const activeStyle = {
  color: '#004096',
  fontWeight: '700',
};

function NavBar() {
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
      <hr />
    </div>
  );
}

export default NavBar;
