import React from "react";
import { Table, Container } from "react-bootstrap";
import TableBodyElement from "./TableBodyElement";
const DownloadTable = () => {
  return (
    <Container fluid className="mt-3 p-2 bg-light rounded">
      <h5 className="mt-3 mb-3 text-dark">
        Qbit Torrent(Downloading) (4 Movies)
      </h5>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Size</th>
            <th>Done(%)</th>
            <th>Language</th>
            <th>Status</th>
            <th>Speed</th>
          </tr>
        </thead>
        <tbody>
          <TableBodyElement
            title="Some.of.Our.Stallions.2021.1080p.WEBRip.DD5.1.x264-NOGRP"
            size="4.43 GB"
            parentage="100%"
            language="English"
            status="uploading"
            speed="2.35 MB"
          />
          <TableBodyElement
            title="Some.of.Our.Stallions.2021.1080p.WEBRip.DD5.1.x264-NOGRP"
            size="4.43 GB"
            parentage="100%"
            language="English"
            status="uploading"
            speed="2.35 MB"
          />
          <TableBodyElement
            title="Some.of.Our.Stallions.2021.1080p.WEBRip.DD5.1.x264-NOGRP"
            size="4.43 GB"
            parentage="100%"
            language="English"
            status="uploading"
            speed="2.35 MB"
          />
        </tbody>
      </Table>
    </Container>
  );
};

export default DownloadTable;
