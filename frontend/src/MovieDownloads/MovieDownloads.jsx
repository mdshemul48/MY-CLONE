import React from "react";
import { Container, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import "./MovieDownloads.css";
const MovieDownloads = () => {
  return (
    <Container className="mt-5 bg-light download-container">
      <Table>
        <thead>
          <tr className="">
            <th className="table-header">
              Date <FontAwesomeIcon className="ml-2" icon={faCaretDown} />{" "}
            </th>
            <th className="table-header">
              Total Downloads{" "}
              <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
            </th>
            <th className="table-header">
              Status <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
            </th>
          </tr>
        </thead>
      </Table>
    </Container>
  );
};

export default MovieDownloads;
