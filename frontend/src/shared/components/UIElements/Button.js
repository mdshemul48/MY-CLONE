import React from "react";

import "./Button.css";
const Button = (props) => {
  return (
    <button
      className={`button ${props.danger ? `danger` : ""} ${
        props.warning ? `warning` : ""
      } ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
};
export default Button;
