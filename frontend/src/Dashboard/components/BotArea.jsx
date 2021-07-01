import React from "react";
import { Container } from "react-bootstrap";

import BotStatus from "./BotStatus";

const BotArea = () => {
  return (
    <Container fluid className="mt-5">
      <h5>Bot Status</h5>
      <BotStatus />
      <BotStatus />
    </Container>
  );
};

export default BotArea;
