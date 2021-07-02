import React from "react";

import { Container, Tabs, Tab } from "react-bootstrap";
const BotFailureReport = () => {
  return (
    <Container fluid className="bg-light mt-4 mb-4 p-3">
      <h5>Bot Failure Report</h5>
      <Tabs>
        <Tab eventKey="PUBLISH_BOT" title="PUBLISH BOT">
          publish bot
        </Tab>
        <Tab eventKey="DOWNLOAD_BOT" title="DOWNLOAD BOT">
          download bot
        </Tab>
        <Tab eventKey="UPLOAD_BOT" title="UPLOAD BOT">
          upload bot
        </Tab>
      </Tabs>
    </Container>
  );
};

export default BotFailureReport;
