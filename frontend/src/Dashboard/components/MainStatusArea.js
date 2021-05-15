import React from "react";

// component: Main Status Area
// castom import
import "./MainStatusArea.css";
import StatusCard from "../../shared/components/UIElements/StatusCard";
export default function MainStatusArea(props) {
  console.log(props.status);
  return (
    <React.Fragment>
      <div className="main-status-area">
        <StatusCard
          countValue={props.status.todayOnDownload}
          statusTitle="Today Movie Added"
          className="total-uploaded"
          background="#7868e6"
        />
        <StatusCard
          countValue={props.status.TotalInDownload}
          statusTitle="In Downloading"
          className="total-uploaded"
          background="#fa9905"
        />
        <StatusCard
          countValue={props.status.TotalInUpload}
          statusTitle="Uploaded In Server"
          className="total-uploaded"
          background="#764ba2"
        />

        <StatusCard
          countValue={props.status.TotalInPublish}
          statusTitle="Total Published"
          className="total-uploaded"
          background="#04aa6d"
        />
        <StatusCard
          countValue={props.status.allMovies}
          statusTitle="Total Movies Added"
          className="Total uploaded"
          background="#0074e0"
        />
      </div>
    </React.Fragment>
  );
}
