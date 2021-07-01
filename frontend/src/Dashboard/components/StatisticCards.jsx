import React from "react";
import { Col, Row } from "react-bootstrap";
import StatisticCard from "./StatisticCard";
const StatisticCards = () => {
  return (
    <Row>
      <Col lg="4" md="6">
        <StatisticCard />
      </Col>

      <Col lg="4" md="6">
        <StatisticCard />
      </Col>
      <Col lg="4" md="6">
        <StatisticCard />
      </Col>
    </Row>
  );
};

export default StatisticCards;
