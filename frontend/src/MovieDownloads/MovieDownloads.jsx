import React from "react";
import { Container, Table } from "react-bootstrap";

import TableHeading from "./components/TableHeading";
import "./MovieDownloads.css";
const MovieDownloads = () => {
  return (
    <Container className="mt-5 bg-light download-container">
      <Table>
        <TableHeading />
      </Table>
    </Container>
  );
};

export default MovieDownloads;
