import React, { useState, useEffect } from "react";

// castom components import
import MainStatusArea from "../components/MainStatusArea";
import Title from "../../shared/components/UIElements/Title";
import QbitDownloadTable from "../components/QbitDownloadTable";
import MainChart from "../components/MainChart";
import BotReport from "../components/BotReport";
import Loading from "../../shared/components/UIElements/Loading";
import BotStatus from "../components/BotStatus";
// importing castom css
import "./Dashboard.css";

// content importer

const Dashboard = (props) => {
  const [mainData, setMainData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        response = await fetch("http://localhost:5000/api/front-page");
        const responseText = await response.json();
        setMainData(responseText);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, []);

  if (!mainData) {
    return <Loading />;
  }

  return (
    <div className="full-dashboard">
      <Title className="main-title">Dashboard</Title>
      <MainStatusArea status={mainData.status} />
      <Title className="main-title">Bot Status</Title>
      <BotStatus />
      <Title className="all-title">Progress</Title>
      <MainChart downloads={mainData.botWorkingData} />
      <QbitDownloadTable />
      <Title className="all-title">all bot report (error)</Title>
      <BotReport botError={mainData.errors} />
    </div>
  );
};
export default Dashboard;
