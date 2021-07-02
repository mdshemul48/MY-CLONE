import React from "react";
import { Table, Container } from "react-bootstrap";
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
          <tr>
            <td>
              Scenes.From.an.Empty.Church.2021.1080p.WEBRip.DD5.1.x264-NOGRP{" "}
            </td>
            <td>4.83 GB </td>
            <td>100%</td>
            <td>English</td>
            <td>uploading</td>
            <td>435.74 KB</td>
          </tr>
          <tr>
            <td>
              Scenes.From.an.Empty.Church.2021.1080p.WEBRip.DD5.1.x264-NOGRP{" "}
            </td>
            <td>4.83 GB </td>
            <td>100%</td>
            <td>English</td>
            <td>uploading</td>
            <td>435.74 KB</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default DownloadTable;
