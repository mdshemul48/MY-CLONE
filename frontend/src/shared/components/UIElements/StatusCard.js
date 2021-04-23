import React from "react";

// components: status Element

// castom Import
import "./StatusCard.css";
export default function StatusCard(props) {
  return (
    <div className={`status ${props.className}`}>
      <h3 className="count">{props.countValue}</h3>
      <hr className="line" />
      <h3>{props.statusTitle}</h3>
    </div>
  );
}
