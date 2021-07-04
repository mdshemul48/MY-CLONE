import React from "react";
import { Container, Table } from "react-bootstrap";

import TableHeading from "./components/TableHeading";
import "./MovieDownloads.css";
const MovieDownloads = () => {
  return (
    <Container className="mt-5 bg-light download-container">
      <Table>
        <TableHeading />
        <tbody>
          <tr>
            <td>04-07-2021</td>
            <td>28 Movies</td>
            <td>
              {" "}
              <span className="table-status-text">pending</span>{" "}
            </td>
          </tr>
          <tr>
            <td>04-07-2021</td>
            <td>28 Movies</td>
            <td>
              {" "}
              <span className="table-status-text verified">verified</span>{" "}
            </td>
          </tr>
          <tr>
            <td>04-07-2021</td>
            <td>28 Movies</td>
            <td>
              {" "}
              <span className="table-status-text">pending</span>{" "}
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default MovieDownloads;
