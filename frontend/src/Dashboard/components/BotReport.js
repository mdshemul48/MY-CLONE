import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./BotReport.css";

// dummy content
import { errorText } from "./DUMMYeRROR";

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
          <div className="logs">
            {errorText.map((errorText) => (
              <p>{errorText}</p>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="logs">
            {errorText.map((errorText) => (
              <p>{errorText}</p>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="logs">
            {errorText.map((errorText) => (
              <p>{errorText}</p>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </React.Fragment>
  );
};

export default BotReport;
