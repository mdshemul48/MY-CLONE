import React from "react";

// castom components import
import MainStatusArea from "../components/MainStatusArea";
import Title from "../../shared/components/UIElements/Title";
import QbitDownloadTable from "../components/QbitDownloadTable";
import MainChart from "../components/MainChart";
import BotReport from "../components/BotReport";
// importing castom css
import "./Dashboard.css";
const Dashboard = (props) => {
  return (
    <div className="full-dashboard">
      <Title className="main-title">Dashboard</Title>
      <MainStatusArea />
      <Title className="all-title">Progress</Title>
      <MainChart />
      <Title className="all-title">Qbit Status</Title>
      <QbitDownloadTable />
      <Title className="all-title">all bot report (error)</Title>
      <BotReport />
    </div>
  );
};
export default Dashboard;
