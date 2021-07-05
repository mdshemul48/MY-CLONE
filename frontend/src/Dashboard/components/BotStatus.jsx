import React from "react";
import { Container, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrochip,
  faToggleOn,
  faToggleOff,
  faHourglass,
  faRedoAlt,
} from "@fortawesome/free-solid-svg-icons";

import BotTime from "./BotTime";
import "./BotStatus.css";
const BotStatus = () => {
  const botStatusOverlay = (
    <Popover className="popover-basic">
      <Popover.Title>Publisher</Popover.Title>
      <Popover.Content>
        <Container fluid>
          <BotTime
            title="Starting Time"
            icon={faToggleOn}
            time="9:02:42 PM"
            color="#2ecc71"
          />
          <BotTime
            title="end Time"
            icon={faToggleOff}
            time="9:02:42 PM"
            color="#e74c3c"
          />
          <BotTime
            title="Total Worked Time"
            icon={faHourglass}
            time="5min"
            color="#f39c12"
          />
          <BotTime
            title="Next Run"
            icon={faRedoAlt}
            time="9:02:42 PM"
            color="#4edfb1"
          />
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
