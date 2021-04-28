import React from "react";

import Title from "../../shared/components/UIElements/Title";
import "./Downloads.css";
import DownloadHistory from "../components/DownloadHistory";
const Downloads = (props) => {
  return (
    <React.Fragment>
      <div className="download-history">
        <Title className="history-title">Downloads history</Title>
        <DownloadHistory />
      </div>
    </React.Fragment>
  );
};

export default Downloads;
