import React from "react";

// castom components import
import StatusCard from "../../shared/components/UIElements/StatusCard";
// importing castom css
import "./Dashboard.css";
const Dashboard = (props) => {
  return (
    <React.Fragment>
      <StatusCard
        countValue={`59/55`}
        statusTitle="Today Upload"
        className="total-uploaded"
      />
    </React.Fragment>
  );
};
export default Dashboard;
