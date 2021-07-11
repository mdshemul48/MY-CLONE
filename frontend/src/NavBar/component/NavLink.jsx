import React from "react";
import { NavLink } from "react-router-dom";
// import { Nav } from "react-bootstrap";

const NavLinkComponent = (props) => {
  return (
    <NavLink
      to={props.link}
      className="navbar__navLink nav-link"
      navlinkclassname={"active"}
      exact
    >
      {props.label}
    </NavLink>
  );
};

export default NavLinkComponent;
