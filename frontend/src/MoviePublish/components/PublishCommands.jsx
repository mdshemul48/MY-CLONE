import React from "react";
import { Container, Card } from "react-bootstrap";
const PublishCommands = () => {
  return (
    <Container className="mt-5">
      <h3 className="mt-2 mb-3">All Publish Commands</h3>
      <hr />

      <div>
        <Card>
          <Card.Header as="h5">Swedish movie</Card.Header>
          <Card.Body></Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default PublishCommands;
