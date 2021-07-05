import React from "react";
import { Link } from "react-router-dom";
// import { Nav } from "react-bootstrap";

const NavLink = (props) => {
  return (
    <Link to={props.link} className="navbar__navLink nav-link">
      {props.label}
    </Link>
  );
};

export default NavLink;
