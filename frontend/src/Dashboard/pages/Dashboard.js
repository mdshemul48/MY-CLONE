import React from "react";

// castom components import
import MainStatusArea from "../components/MainStatusArea";
import Title from "../../shared/components/UIElements/Title";
import QbitDownloadTable from "../components/QbitDownloadTable";
import MainChart from "../components/MainChart";
// importing castom css
import "./Dashboard.css";
const Dashboard = (props) => {
  return (
    <div className="full-dashboard">
      <Title className="main-title">Dashboard</Title>
      <MainStatusArea />
      <Title className="status-chart">Progress Chart</Title>
      <MainChart />
      <Title className="qbit-status">Qbit Status</Title>
      <QbitDownloadTable />
    </div>
  );
};
export default Dashboard;
