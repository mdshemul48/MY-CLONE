import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="dark" extend="lg" variant="dark">
      <Navbar.Brand>MY CLONE 2.0</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#">Dashboard</Nav.Link>
          <Nav.Link href="#">Movie Downloads</Nav.Link>
          <Nav.Link href="#">Movie Publisher</Nav.Link>
          <Nav.Link href="#">Create User</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
