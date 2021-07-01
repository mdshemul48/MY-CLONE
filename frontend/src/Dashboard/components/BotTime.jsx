import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BotTime = (props) => {
  return (
    <div title={props.title} className="d-flex align-items-center">
      <FontAwesomeIcon icon={props.icon} size="lg" color={props.color} />
      <h5 className="ml-2">{props.time}</h5>
    </div>
  );
};

export default BotTime;
