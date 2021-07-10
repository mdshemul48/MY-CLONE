import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import {
  faDownload,
  faFilm,
  faFileVideo,
  faUpload,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";

import StatisticCard from "./StatisticCard";
const StatisticCards = () => {
  const { status } = useSelector((state) => state.dashboard.data);
  const downloadingLength = useSelector(
    (state) => state.downloading.downloadLength
  );
  return (
    <>
      <Row>
        <Col lg="4">
          <StatisticCard
            label="Today Movie Added"
            icon={faFilm}
            count={status.todayOnDownload}
            color="text-dark"
            backgroundColor="bg-warning"
          />
        </Col>

        <Col lg="4">
          <StatisticCard
            label="Downloading"
            icon={faDownload}
            count={downloadingLength}
            backgroundColor="bg-danger"
          />
        </Col>
        <Col lg="4">
          <StatisticCard
            label="Uploaded In Server"
            icon={faUpload}
            count={status.TotalInUpload}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <StatisticCard
            label="Total Published"
            icon={faFileVideo}
            count={status.TotalInPublish}
            backgroundColor="bg-success"
          />
        </Col>
        <Col lg="6">
          <StatisticCard
            label="Total Movies Added"
            icon={faPlusSquare}
            count={status.allMovies}
            backgroundColor="bg-primary"
          />
        </Col>
      </Row>
    </>
  );
};

export default StatisticCards;
