import React from "react";

// castom components import
import MainStatusArea from "../components/MainStatusArea";
import Title from "../../shared/components/UIElements/Title";

// importing castom css
import "./Dashboard.css";
const Dashboard = (props) => {
  return (
    <React.Fragment>
      <div className="full-dashboard">
        <Title className="main-title">Dashboard</Title>
        <MainStatusArea />
        <Title className="qbit-status">Qbit Status</Title>
      </div>
    </React.Fragment>
  );
};
export default Dashboard;
