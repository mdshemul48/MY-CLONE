import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import dateFormat from "dateformat";
import "react-tabs/style/react-tabs.css";
import "./BotReport.css";

const BotReport = (props) => {
  console.log(props.botError);
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
            {props.botError.publisherError.map((errorText) => (
              <p key={errorText["_id"]}>
                [{dateFormat(errorText.time, "h:MM:ss TT d/mm/yy")}]{" "}
                {errorText["errorText"]}
                <br /> {"___________________________"}
              </p>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="logs">
            {props.botError.downloaderError.map((errorText) => (
              <p key={errorText["_id"]}>
                [{dateFormat(errorText.time, "h:MM:ss TT d/mm/yy")}]{" "}
                {errorText["errorText"]}
                <br /> {"___________________________"}
              </p>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="logs">
            {props.botError.uploaderError.map((errorText) => (
              <p key={errorText["_id"]}>
                [{dateFormat(errorText.time, "h:MM:ss TT d/mm/yy")}]{" "}
                {errorText["errorText"]}
                <br /> {"___________________________"}
              </p>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </React.Fragment>
  );
};

export default BotReport;
