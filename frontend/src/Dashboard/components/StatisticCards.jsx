import React from "react";
import { Col, Row } from "react-bootstrap";

import {
  faDownload,
  faFilm,
  faFileVideo,
  faUpload,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";

import StatisticCard from "./StatisticCard";
const StatisticCards = () => {
  return (
    <>
      <Row>
        <Col lg="4">
          <StatisticCard
            label="Today Movie Added"
            icon={faFilm}
            count={50}
            color="text-dark"
            backgroundColor="bg-warning"
          />
        </Col>

        <Col lg="4">
          <StatisticCard
            label="Downloading"
            icon={faDownload}
            count={10}
            backgroundColor="bg-danger"
          />
        </Col>
        <Col lg="4">
          <StatisticCard
            label="Uploaded In Server"
            icon={faUpload}
            count={23}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <StatisticCard
            label="Total Published"
            icon={faFileVideo}
            count={50}
            backgroundColor="bg-success"
          />
        </Col>
        <Col lg="6">
          <StatisticCard
            label="Total Movies Added"
            icon={faPlusSquare}
            count={50}
            backgroundColor="bg-primary"
          />
        </Col>
      </Row>
    </>
  );
};

export default StatisticCards;
