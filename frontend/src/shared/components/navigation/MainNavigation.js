import React from "react";
// castom import css
import "./MainNavigation.css";

// castom import js
import NavLinks from "./NavLinks";
import Logo from "../Logo/Logo";
const MainNavigation = () => {
  return (
    <div className="top-nav">
      <div className="logo-and-nav">
        <Logo />
        <NavLinks />
      </div>
    </div>
  );
};
export default MainNavigation;
