import React from "react";

import "./MainChart.css";
import StatusChart from "./StatusChart";
const MainChart = () => {
  const labels = [
    "19-04-2021",
    "20-04-2021",
    "21-04-2021",
    "22-04-2021",
    "23-04-2021",
    "24-04-2021",
    "25-04-2021",
  ];
  const datasets1 = [
    {
      label: "uploaded",
      data: [33, 53, 85, 41, 44, 65, 75],
      fill: false,
      borderColor: "#0074e0",
    },
    {
      label: "Published",
      data: [53, 12, 43, 64, 76, 12, 85],
      fill: false,
      borderColor: "rgb(4, 170, 109,1)",
    },
  ];
  const datasets2 = [
    {
      label: "uploader error",
      data: [42, 23, 43, 45, 46, 12, 32],
      fill: false,
      borderColor: "red",
    },
    {
      label: "downloader error",
      data: [53, 12, 43, 64, 76, 12, 85],
      fill: false,
      borderColor: "yellow",
    },
    {
      label: "publisher error",
      data: [33, 53, 85, 41, 44, 65, 75],
      fill: false,
      borderColor: "gray",
    },
  ];
  const datasets3 = [
    {
      label: "uplola",
      data: [53, 12, 43, 64, 76, 12, 85],
      fill: false,
      borderColor: "black",
    },
  ];
  return (
    <div className="all-chart">
      <StatusChart labels={labels} datasets={datasets1} />
      <StatusChart labels={labels} datasets={datasets2} />
      <StatusChart labels={labels} datasets={datasets3} />
    </div>
  );
};
export default MainChart;
