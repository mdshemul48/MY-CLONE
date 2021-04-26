import React from "react";

import "./MainChart.css";
import StatusChart from "./StatusChart";
const MainChart = () => {
  return (
    <div className="all-chart">
      <StatusChart />
      <StatusChart />
      <StatusChart />
    </div>
  );
};
export default MainChart;
