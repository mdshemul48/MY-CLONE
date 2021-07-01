import React from "react";

import { Nav } from "react-bootstrap";
import NavLink from "./NavLink";
const AllNavLink = () => {
  return (
    <Nav className="mr-auto">
      <NavLink link="#" label="Dashboard" />
      <NavLink link="#" label="Movie Downloads" />
      <NavLink link="#" label="Movie Publisher" />
      <NavLink link="#" label="Create User" />
    </Nav>
  );
};

export default AllNavLink;
