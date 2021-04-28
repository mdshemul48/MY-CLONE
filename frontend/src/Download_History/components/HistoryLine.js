import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import "./HistoryLine.css";
const HistoryLine = (props) => {
  return (
    <p title={props.checked && "checked by admin."}>
      <Link
        className={`history-line ${props.checked ? "checked" : ""}`}
        to={"/downloads/" + props.id}
      >
        {props.children} {props.checked && <FontAwesomeIcon icon={faCheck} />}
      </Link>
    </p>
  );
};
export default HistoryLine;
