import React from "react";

import { Container, Tabs, Tab } from "react-bootstrap";
const BotFailureReport = () => {
  return (
    <Container fluid className="bg-light mt-4 mb-4 p-3 rounded">
      <h5>Bot Failure Report</h5>
      <Tabs>
        <Tab eventKey="PUBLISH_BOT" title="PUBLISH BOT">
          <p className="m-2 p-1">
            [10:04:30 PM 1/07/21] A Quiet Place Part II 2020 1080p WEBRip x264
            movie already exist in server.
          </p>
          <p className="m-2 p-1">[2:24:31 PM 1/07/21] login failed.</p>
        </Tab>
        <Tab eventKey="DOWNLOAD_BOT" title="DOWNLOAD BOT">
          download bot
        </Tab>
        <Tab eventKey="UPLOAD_BOT" title="UPLOAD BOT"></Tab>
      </Tabs>
    </Container>
  );
};

export default BotFailureReport;
