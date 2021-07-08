import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { logoutMethod } from "../../Store/asyncMethods/authMethods";
const Logout = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    console.log("gg");
    dispatch(logoutMethod());
  };
  return (
    <Nav>
      <Nav.Link
        className="ml-2 mr-2 navbar__navLink  d-flex align-items-center"
        onClick={logoutHandler}
      >
        {" "}
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        Logout
      </Nav.Link>
    </Nav>
  );
};

export default Logout;
