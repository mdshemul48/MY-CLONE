import React from "react";

import { Line } from "react-chartjs-2";
import "./StatusChart.css";
const StatusChart = (props) => {
  const data = {
    labels: props.labels,
    datasets: props.datasets,
  };
  return (
    <React.Fragment>
      <div className={`StatusChart ${props.className || ""}`}>
        <Line data={data} />
      </div>
    </React.Fragment>
  );
};

export default StatusChart;
