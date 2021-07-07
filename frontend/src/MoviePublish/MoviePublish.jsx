import React from "react";
import { Container } from "react-bootstrap";

import SubmitForm from "./components/SubmitForm";
import PublishCommands from "./components/PublishCommands";
const MoviePublish = () => {
  return (
    <Container>
      <SubmitForm />
      <PublishCommands />
    </Container>
  );
};

export default MoviePublish;
