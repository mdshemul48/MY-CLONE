import React from "react";

import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import PageTitle from "../Title/PageTitle";
import MovieCard from "./components/MovieCard";
import "./DayDownloads.css";
const DayDownloads = () => {
  return (
    <>
      <PageTitle>History Of 30-06-2021</PageTitle>
      <Container className="p-lg-5 movies-area" fluid>
        <Container
          fluid
          className="d-flex justify-content-between check-area pb-2"
        >
          <h4 className="text-break">
            Working History Of 30-06-2021 (48 Movies)
          </h4>
          <Button variant="success" className="checkButton">
            verify
            <FontAwesomeIcon className="ml-2" icon={faCheck} />{" "}
          </Button>
        </Container>

        <Container fluid>
          <MovieCard />
        </Container>
      </Container>
    </>
  );
};

export default DayDownloads;
