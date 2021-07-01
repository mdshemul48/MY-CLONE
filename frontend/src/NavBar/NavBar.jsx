import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand>MY CLONE 2.0</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" className="navbar__navLink">
            Dashboard
          </Nav.Link>
          <Nav.Link href="#" className="navbar__navLink">
            Movie Downloads
          </Nav.Link>
          <Nav.Link href="#" className="navbar__navLink">
            Movie Publisher
          </Nav.Link>
          <Nav.Link href="#" className="navbar__navLink">
            Create User
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Nav>
          <Nav.Link className="ml-2 mr-2 navbar__navLink  d-flex align-items-center">
            {" "}
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
