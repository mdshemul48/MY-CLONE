import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
// castom css import
import "./NavLink.css";
const NavLinks = () => {
  return (
    <React.Fragment>
      <ul className="menu-bar">
        <li className="menu-item">
          <NavLink className="menu-link" exact to="/">
            Dashboard
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink className="menu-link" to="/downloads">
            Downloads History
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
        <li className="menu-item logout">
          <NavLink to="/logout" exact className="menu-link">
            <FontAwesomeIcon icon={faSignOutAlt} /> logout
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
};
export default NavLinks;
