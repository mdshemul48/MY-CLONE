import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import StatisticCards from "./components/StatisticCards";
import TopRightSide from "./components/TopRightSide";
import DownloadTable from "./components/DownloadTable";
import BotFailureReport from "./components/BotFailureReport";
const Dashboard = () => {
  return (
    <Container fluid className="mt-3">
      <Row className="d-flex">
        <Col lg="9" md="12" sm="12" className="order-1">
          <Container fluid>
            <StatisticCards />
            <DownloadTable />
            <BotFailureReport />
          </Container>
        </Col>
        <Col lg="3" md="12" sm="12" className="order-sm-1">
          <TopRightSide />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;