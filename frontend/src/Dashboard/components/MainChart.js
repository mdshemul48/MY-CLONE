import React from "react";

import "./MainChart.css";
import StatusChart from "./StatusChart";
import BotStatus from "./BotStatus";
const MainChart = (props) => {
  const downloads = [].concat(props.downloads).reverse();
  console.log(downloads);
  const labels = downloads.map((day) => {
    return day.date;
  });
  const datasets1 = [
    {
      label: "Downloads",
      data: downloads.map((day) => {
        return day.download;
      }),
      fill: false,
      borderColor: "#0074e0",
    },
  ];

  // const datasets2 = [
  //   {
  //     label: "uploader error",
  //     data: [42, 23, 43, 45, 46, 12, 32],
  //     fill: false,
  //     borderColor: "red",
  //   },
  //   {
  //     label: "downloader error",
  //     data: [53, 12, 43, 64, 76, 12, 85],
  //     fill: false,
  //     borderColor: "yellow",
  //   },
  //   {
  //     label: "publisher error",
  //     data: [33, 53, 85, 41, 44, 65, 75],
  //     fill: false,
  //     borderColor: "gray",
  //   },
  // ];
  // const datasets3 = [
  //   {
  //     label: "uplola",
  //     data: [53, 12, 43, 64, 76, 12, 85],
  //     fill: false,
  //     borderColor: "black",
  //   },
  // ];
  return (
    <div className="all-chart">
      <StatusChart labels={labels} datasets={datasets1} />

      {/* <StatusChart labels={labels} datasets={datasets2} />
      <StatusChart labels={labels} datasets={datasets3} /> */}
      <BotStatus />
    </div>
  );
};
export default MainChart;
