import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";

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

  return (
    <Container fluid className="d-flex align-items-center mt-2">
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
  );
};

export default BotStatus;
