import React from "react";
import HistoryLine from "./HistoryLine";

import Card from "../../shared/components/UIElements/Card";
import "./DownloadHistory.css";
const DonwloadHistory = (props) => {
  return (
    <Card className="download-report">
      <HistoryLine id="34534535345345345345" checked={true}>
        01-04-2021 (33 movies)
      </HistoryLine>
      <HistoryLine id="34534535345345345345" checked={false}>
        01-04-2021 (33 movies)
      </HistoryLine>
      <HistoryLine id="34534535345345345345" checked={true}>
        01-04-2021 (33 movies)
      </HistoryLine>
      <HistoryLine id="34534535345345345345" checked={true}>
        01-04-2021 (33 movies)
      </HistoryLine>
      <HistoryLine id="34534535345345345345" checked={true}>
        01-04-2021 (33 movies)
      </HistoryLine>
      <HistoryLine id="34534535345345345345" checked={false}>
        01-04-2021 (33 movies)
      </HistoryLine>
    </Card>
  );
};
export default DonwloadHistory;
