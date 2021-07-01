import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import StatisticCards from "./components/StatisticCards";
import TopRightSide from "./components/TopRightSide";
const Dashboard = () => {
  return (
    <Container fluid className="mt-3">
      <Row>
        <Col lg="8" md="12">
          <Container>
            <StatisticCards />
          </Container>
        </Col>
        <Col lg="4" md="12">
          <TopRightSide />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
