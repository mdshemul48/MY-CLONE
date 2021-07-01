import React from "react";

import { Nav } from "react-bootstrap";
import NavLink from "./NavLink";
const AllNavLink = () => {
  return (
    <Nav className="mr-auto">
      <NavLink link="/" label="Dashboard" />
      <NavLink link="/downloads" label="Movie Downloads" />
      <NavLink link="/publish" label="Movie Publisher" />
      <NavLink link="/user" label="Create User" />
    </Nav>
  );
};

export default AllNavLink;
