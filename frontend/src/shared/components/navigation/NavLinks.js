import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/Auth-context";
// castom css import
import "./NavLink.css";
const NavLinks = () => {
  const auth = useContext(AuthContext);
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
            Movie Downloads
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink className="menu-link" to="/publisher">
            Movie Publisher
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink className="menu-link" to="/create-user">
            Create User
          </NavLink>
        </li>
        <li className="menu-item logout">
          <button className="menu-link logout-btn" onClick={auth.logout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </li>
      </ul>
    </React.Fragment>
  );
};
export default NavLinks;
