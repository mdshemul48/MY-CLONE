import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BotTime = (props) => {
  return (
    <div title={props.title}>
      <FontAwesomeIcon icon={props.icon} />
      <h6>{props.time}</h6>
    </div>
  );
};

export default BotTime;
