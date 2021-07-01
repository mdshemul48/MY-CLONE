import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import StatisticCards from "./components/StatisticCards";

const Dashboard = () => {
  return (
    <Container fluid className="mt-3">
      <Row>
        <Col lg="8">
          <Container>
            <StatisticCards />
          </Container>
        </Col>
        <Col lg="4"></Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
