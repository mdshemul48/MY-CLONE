import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./BotReport.css";
const BotReport = () => {
  return (
    <React.Fragment>
      <Tabs className="botReport">
        <TabList>
          <Tab>PUBLISH BOT</Tab>
          <Tab>DOWNLOAD BOT</Tab>
          <Tab>UPLOAD BOT</Tab>
        </TabList>
        <TabPanel>
          <h2>publish</h2>
        </TabPanel>
        <TabPanel>
          <h2>download</h2>
        </TabPanel>
        <TabPanel>
          <h2>upload</h2>
        </TabPanel>
      </Tabs>
    </React.Fragment>
  );
};

export default BotReport;
