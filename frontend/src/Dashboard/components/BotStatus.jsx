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
import dataFormat from "dateformat";
import BotTime from "./BotTime";
import timeDifference from "../../util/timeDifference";

import "./BotStatus.css";
const BotStatus = (props) => {
  const { bot } = props;

  const botStatusOverlay = (
    <Popover className="popover-basic">
      <Popover.Title>Publisher</Popover.Title>
      <Popover.Content>
        <Container fluid>
          <BotTime
            title="Starting Time"
            icon={faToggleOn}
            time={dataFormat(bot.StartingTime, "h:MM:ss TT")}
            color="#2ecc71"
          />
          {bot.StoppedTime && (
            <BotTime
              title="end Time"
              icon={faToggleOff}
              time={dataFormat(bot.StoppedTime, "h:MM:ss TT")}
              color="#e74c3c"
            />
          )}
          <BotTime
            title="Total Worked Time"
            icon={faHourglass}
            time={
              timeDifference(
                new Date(bot.StoppedTime),
                new Date(bot.StartingTime)
              ) + " min"
            }
            color={"#f39c12"}
          />
          <BotTime
            title="Next Run"
            icon={faRedoAlt}
            time={dataFormat(
              new Date(bot.StoppedTime).getTime() + 1 * 60 * 60 * 1000,
              "h:MM:ss TT"
            )}
            color="#4edfb1"
          />
        </Container>
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="left" overlay={botStatusOverlay}>
      <Container fluid className="botState d-flex align-items-center mt-2">
        <div className={`bot__Icon ${bot.botName}`}>
          <FontAwesomeIcon icon={faMicrochip} />
        </div>
        <div className="ml-2">
          <h5 className="bot__name mt-0 mb-0">{bot.botName}</h5>
          <h6>
            <small
              className={`bot__status ${
                bot.status === "stopped" && "text-danger"
              }`}
            >
              {bot.status}
            </small>
          </h6>
        </div>
      </Container>
    </OverlayTrigger>
  );
};

export default BotStatus;
