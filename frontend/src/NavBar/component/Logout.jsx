import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Nav } from "react-bootstrap";

const Logout = () => {
  return (
    <Nav>
      <Nav.Link className="ml-2 mr-2 navbar__navLink  d-flex align-items-center">
        {" "}
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        Logout
      </Nav.Link>
    </Nav>
  );
};

export default Logout;
