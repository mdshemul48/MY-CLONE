import React from "react";
import { Navbar } from "react-bootstrap";

import "./Logo.css";
const Logo = () => {
  return (
    <Navbar.Brand>
      <span className="navbar__full-logo">
        MY <span className="navbar__full-logo_clone">CLONE</span> 2.0
      </span>
    </Navbar.Brand>
  );
};

export default Logo;
