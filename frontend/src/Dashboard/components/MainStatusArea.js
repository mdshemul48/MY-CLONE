import React from "react";

// component: Main Status Area
// castom import
import "./MainStatusArea.css";
import StatusCard from "../../shared/components/UIElements/StatusCard";
export default function MainStatusArea(props) {
  return (
    <React.Fragment>
      <div className="main-status-area">
        <StatusCard
          countValue="59"
          statusTitle="Today Upload"
          className="total-uploaded"
          background="#0074e0"
        />
        <StatusCard
          countValue="10"
          statusTitle="Downloading"
          className="total-uploaded"
          background="#fa9905"
        />
        <StatusCard
          countValue="18"
          statusTitle="Yesterday Uploaded"
          className="total-uploaded"
          background="#764ba2"
        />
        <StatusCard
          countValue="19"
          statusTitle="Yesterday Uploaded"
          className="Total uploaded"
          background="#04aa6d"
        />
        <StatusCard
          countValue="23"
          statusTitle="Download Failed"
          className="total-uploaded"
          background="#f45801"
        />
      </div>
    </React.Fragment>
  );
}
