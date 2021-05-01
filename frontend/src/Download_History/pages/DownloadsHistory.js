import React from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import Card from "../../shared/components/UIElements/Card";
import Title from "../../shared/components/UIElements/Title";
import Button from "../../shared/components/UIElements/Button";
import "./DownloadHistory.css";
const DownloadHistory = () => {
  const { dayId } = useParams();
  return (
    <React.Fragment>
      <div className="all-post-card">
        <div className="title-of-the-page">
          <Title className="working-history-title">
            Working History of {dayId}
          </Title>
          <Button className="chacked" hover>
            CHECKED <FontAwesomeIcon icon={faCheck} />
          </Button>
        </div>

        <Card>
          <h1>is this a joke</h1>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default DownloadHistory;
