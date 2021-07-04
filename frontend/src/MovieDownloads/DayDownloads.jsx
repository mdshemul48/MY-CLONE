import React from "react";
import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./DayDownloads.css";
const DayDownloads = () => {
  return (
    <Container className="bg-light mt-5 p-2 movies-area">
      <Container fluid className="d-flex justify-content-end check-area pb-2">
        <Button variant="success" className="checkButton">
          verify
          <FontAwesomeIcon className="ml-2" icon={faCheck} />{" "}
        </Button>
      </Container>

      <Container fluid>gg</Container>
    </Container>
  );
};

export default DayDownloads;
