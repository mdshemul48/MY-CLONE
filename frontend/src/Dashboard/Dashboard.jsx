import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import PageTitle from "../Title/PageTitle";
import StatisticCards from "./components/StatisticCards";
import TopRightSide from "./components/TopRightSide";
import DownloadTable from "./components/DownloadTable";
import BotFailureReport from "./components/BotFailureReport";

import { dashboardData } from "../Store/asyncMethods/DashboardMethods";
const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dashboardData());
  }, [dispatch]);
  return (
    <>
      <PageTitle>Dashboard</PageTitle>
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
    </>
  );
};

export default Dashboard;
