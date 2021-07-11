import React from "react";
import { useSelector } from "react-redux";
import "./NavUsername.css";
const NavUsername = () => {
  const { username } = useSelector((state) => state.auth.user);
  return <span className="navUsername ">Hola, {username}</span>;
};

export default NavUsername;
