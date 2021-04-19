import React from "react";
import { NavLink } from "react-router-dom";

// castom css import
import "./NavLink.css";
const NavLinks = () => {
  return (
    <ul className="menu-bar">
      <li className="menu-item">
        <NavLink className="menu-link" exact to="/">
          Dashboard
        </NavLink>
      </li>
      <li className="menu-item">
        <NavLink className="menu-link" to="/downloads">
          Downloads
        </NavLink>
      </li>
      <li className="menu-item">
        <NavLink className="menu-link" to="/publisher">
          Publisher
        </NavLink>
      </li>
      <li className="menu-item">
        <NavLink className="menu-link" to="/create-user">
          Create User
        </NavLink>
      </li>
    </ul>
  );
};
export default NavLinks;
