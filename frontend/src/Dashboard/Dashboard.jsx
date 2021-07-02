import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import StatisticCards from "./components/StatisticCards";
import TopRightSide from "./components/TopRightSide";
import DownloadTable from "./components/DownloadTable";
const Dashboard = () => {
  return (
    <Container fluid className="mt-3">
      <Row>
        <Col lg="9" md="12" sm="12">
          <Container fluid>
            <StatisticCards />
            <DownloadTable />
          </Container>
        </Col>
        <Col lg="3" md="12" sm="12">
          <TopRightSide />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
