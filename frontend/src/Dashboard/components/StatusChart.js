import React from "react";

import { Line } from "react-chartjs-2";

import "./StatusChart.css";
const StatusChart = (props) => {
  const data = {
    labels: [
      "19-04-2021",
      "20-04-2021",
      "21-04-2021",
      "22-04-2021",
      "23-04-2021",
      "24-04-2021",
      "25-04-2021",
    ],
    datasets: [
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
    ],
  };
  return (
    <div className={`StatusChart ${props.className}`}>
      <Line data={data} />
    </div>
  );
};

export default StatusChart;
