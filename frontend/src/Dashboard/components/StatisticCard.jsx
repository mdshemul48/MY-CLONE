import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./StatisticCard.css";
// this will show single statistic for single info
const StatisticCard = (props) => {
  return (
    <Container
      className={`d-flex justify-content-between align-items-center w-100 mt-2 pt-3 Statistic-Card text-white ${
        props.backgroundColor || "bg-dark"
      } ${props.color || "text-white"}`}
    >
      <div className="info">
        <h5 className="counter">{props.count}</h5>
        <p>
          <small>{props.label}</small>
        </p>
      </div>
      <div>
        <FontAwesomeIcon icon={props.icon} className="statistic__icon" />
      </div>
    </Container>
  );
};

export default StatisticCard;
