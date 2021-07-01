import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import "./StatisticCard.css";
const StatisticCard = () => {
  return (
    <Container
      className="d-flex justify-content-between align-items-center w-100 mt-2 pt-3 pb-1 Statistic-Card text-white"
      style={{ backgroundColor: "#29314F" }}
    >
      <div className="info">
        <h5 className="counter">50</h5>
        <p>
          <small>Tody Download</small>
        </p>
      </div>
      <div>
        <FontAwesomeIcon icon={faDownload} className="statistic__icon" />
      </div>
    </Container>
  );
};

export default StatisticCard;
