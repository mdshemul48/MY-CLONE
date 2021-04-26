import React from "react";

import { Line } from "react-chartjs-2";

import "./StatusChart.css";
const StatusChart = (props) => {
  const data = {
    labels: props.labels,
    datasets: props.datasets,
  };
  return (
    <div className={`StatusChart ${props.className || ""}`}>
      <Line data={data} />
    </div>
  );
};

export default StatusChart;
