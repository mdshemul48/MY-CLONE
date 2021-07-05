import React from "react";
import { Container, Table } from "react-bootstrap";

import TableHeading from "./components/TableHeading";
import TableElement from "./components/TableElement";
import "./MovieDownloads.css";
const MovieDownloads = () => {
  return (
    <Container className="mt-5 bg-light download-container">
      <Table responsive>
        <TableHeading />
        <tbody>
          <TableElement />
          <TableElement />
          <TableElement />
        </tbody>
      </Table>
    </Container>
  );
};

export default MovieDownloads;
