import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const HistoryLine = (props) => {
  return (
    <p className="history-line">
      {props.children} <FontAwesomeIcon icon={faCheck} />
    </p>
  );
};
export default HistoryLine;
