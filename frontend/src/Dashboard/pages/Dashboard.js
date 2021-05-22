import React, { useState, useEffect } from "react";

// castom components import
import MainStatusArea from "../components/MainStatusArea";
import Title from "../../shared/components/UIElements/Title";
import QbitDownloadTable from "../components/QbitDownloadTable";
import MainChart from "../components/MainChart";
import BotReport from "../components/BotReport";
import Loading from "../../shared/components/UIElements/Loading";
// importing castom css
import "./Dashboard.css";

// content importer
const fetchData = async (setMainData) => {
  let response;
  try {
    response = await fetch("http://localhost:5000/api/front-page");
    const responseText = await response.json();
    setMainData(responseText);
  } catch (err) {
    alert(err);
  }
};
const Dashboard = () => {
  const [mainData, setMainData] = useState();

  useEffect(() => {
    fetchData(setMainData);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      const fetchTimeout = fetchData(setMainData);
      return clearTimeout(fetchTimeout);
    }, 60000);
  });
  if (!mainData) {
    return <Loading />;
  }

  return (
    <div className="full-dashboard">
      <Title className="main-title">Dashboard</Title>
      <MainStatusArea status={mainData.status} />

      <Title className="all-title">Progress</Title>
      <MainChart downloads={mainData.botWorkingData} />
      <QbitDownloadTable />
      <Title className="all-title">all bot report (error)</Title>
      <BotReport botError={mainData.errors} />
    </div>
  );
};
export default Dashboard;
