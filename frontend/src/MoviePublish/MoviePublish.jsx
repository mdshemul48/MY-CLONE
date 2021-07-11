import React from "react";
import { Container } from "react-bootstrap";
import PageTitle from "../Title/PageTitle";
import SubmitForm from "./components/SubmitForm";
import PublishCommands from "./components/PublishCommands";
const MoviePublish = () => {
  return (
    <>
      <PageTitle>Publish</PageTitle>
      <Container>
        <SubmitForm />
        <PublishCommands />
      </Container>
    </>
  );
};

export default MoviePublish;
