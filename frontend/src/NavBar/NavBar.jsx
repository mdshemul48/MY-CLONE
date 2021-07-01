import React from "react";
import { Navbar, Container } from "react-bootstrap";

import Logo from "./component/Logo";
import AllNavLink from "./component/AllNavLink";
import NavSearchArea from "./component/NavSearchArea";
import "./NavBar.css";
const NavBar = () => {
  return (
    <Navbar expand="lg" variant="dark" className="navbar">
      <Container fluid>
        <Logo />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <AllNavLink />
          <NavSearchArea />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
