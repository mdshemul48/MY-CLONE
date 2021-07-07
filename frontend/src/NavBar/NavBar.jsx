import React from "react";
import { Navbar, Container } from "react-bootstrap";

import Logo from "./component/Logo";
import AllNavLink from "./component/AllNavLink";
import Logout from "./component/Logout";
import NavUsername from "./component/NavUsername";
import "./NavBar.css";
const NavBar = () => {
  return (
    <Navbar expand="lg" variant="dark" className="navbar">
      <Container fluid>
        <Logo />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <AllNavLink />
          <NavUsername />
          <Logout />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
