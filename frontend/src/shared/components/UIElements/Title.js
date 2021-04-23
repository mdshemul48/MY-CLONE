import React from "react";

// castom import
import "./Title.css";
export default function Title(props) {
  return <h2 className={`title ${props.className || ""}`}>{props.children}</h2>;
}
