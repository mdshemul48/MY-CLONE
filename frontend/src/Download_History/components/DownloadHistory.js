import React from "react";
import HistoryLine from "./HistoryLine";

import Card from "../../shared/components/UIElements/Card";
import "./DownloadHistory.css";
const DownloadHistory = (props) => {
  return (
    <Card className="download-report">
      {props.downloads.map((date) => {
        return (
          <HistoryLine id={date._id} key={date._id} checked={date.checked}>
            {date.date} ({date.movies.length})
          </HistoryLine>
        );
      })}
    </Card>
  );
};
export default DownloadHistory;
