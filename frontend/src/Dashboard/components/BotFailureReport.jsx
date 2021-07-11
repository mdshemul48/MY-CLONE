import React from "react";
import dateFormat from "dateformat";
import { useSelector } from "react-redux";
import { Container, Tabs, Tab } from "react-bootstrap";
const BotFailureReport = () => {
  const fails = useSelector((state) => state.dashboard.data.errors);
  return (
    <Container fluid className="bg-light mt-4 mb-4 p-3 rounded">
      <h5>Bot Failure Report</h5>
      <Tabs>
        <Tab eventKey="PUBLISH_BOT" title="PUBLISH BOT">
          {fails.publisherError.map((data) => (
            <p key={data._id} className="m-2 p-1 text-break">
              [{dateFormat(data.time, "h:MM:ss TT d/mm/yy")}] {data.errorText}
            </p>
          ))}
        </Tab>
        <Tab eventKey="DOWNLOAD_BOT" title="DOWNLOAD BOT">
          {fails.downloaderError.map((data) => (
            <p key={data._id} className="m-2 p-1 text-break">
              [{dateFormat(data.time, "h:MM:ss TT d/mm/yy")}] {data.errorText}
            </p>
          ))}
        </Tab>
        <Tab eventKey="UPLOAD_BOT" title="UPLOAD BOT">
          {fails.uploaderError.map((data) => (
            <p key={data._id} className="m-2 p-1 text-break text-break">
              [{dateFormat(data.time, "h:MM:ss TT d/mm/yy")}] {data.errorText}
            </p>
          ))}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default BotFailureReport;
