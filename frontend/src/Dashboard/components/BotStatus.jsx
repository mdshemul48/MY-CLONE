import React from "react";
import { Container, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip, faToggleOn } from "@fortawesome/free-solid-svg-icons";

import BotTime from "./BotTime";
import "./BotStatus.css";
const BotStatus = () => {
  const botDummyStatus = {
    status: "stopped",
    _id: "60ddd1a9662a8846f4b45b54",
    botName: "downloader",
    StartingTime: "2021-07-01T14:31:05.100Z",
    __v: 0,
    StoppedTime: "2021-07-01T14:33:52.331Z",
  };
  const botStatusOverlay = (
    <Popover className="popover-basic">
      <Popover.Title>Publisher</Popover.Title>
      <Popover.Content>
        <Container fluid>
          <BotTime title="Starting Time" icon={faToggleOn} time="9:02:42 PM" />
          <BotTime title="end Time" icon={faToggleOn} time="9:02:42 PM" />
          <BotTime title="Total Worked Time" icon={faToggleOn} time="5min" />
          <BotTime title="Next Run" icon={faToggleOn} time="9:02:42 PM" />
        </Container>
      </Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click" placement="left" overlay={botStatusOverlay}>
      <Container fluid className="botState d-flex align-items-center mt-2">
        <div className="bot__Icon bot1">
          <FontAwesomeIcon icon={faMicrochip} />
        </div>
        <div className="ml-2">
          <h5 className="bot__name mt-0 mb-0">Publisher</h5>
          <h6>
            <small className="bot__status ">Running..</small>
          </h6>
        </div>
      </Container>
    </OverlayTrigger>
  );
};

export default BotStatus;
