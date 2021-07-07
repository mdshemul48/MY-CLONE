import React from "react";
import { Container } from "react-bootstrap";
import Commands from "./Commands";
const PublishCommands = () => {
  return (
    <Container className="mt-5">
      <h3 className="mt-2 mb-3">All Publish Commands</h3>
      <hr />
      <div>
        <Commands />
        <Commands />
        <Commands />
        <Commands />
        <Commands />
        <Commands />
      </div>
    </Container>
  );
};

export default PublishCommands;
