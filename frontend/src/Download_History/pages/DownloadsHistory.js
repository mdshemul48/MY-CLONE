import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import Card from "../../shared/components/UIElements/Card";
import Title from "../../shared/components/UIElements/Title";
import Button from "../../shared/components/UIElements/Button";
import "./DownloadHistory.css";
import Loading from "../../shared/components/UIElements/Loading";
import AllMovies from "../components/AllMovies";
const DownloadHistory = () => {
  const { dayId } = useParams();

  const [mainData, setMainData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        response = await fetch(
          `http://localhost:5000/api/download-page/${dayId}`
        );
        const responseText = await response.json();
        console.log(responseText);
        setMainData(responseText);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, [dayId]);

  if (!mainData) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <div className="all-post-card">
        <div className="title-of-the-page">
          <Title className="working-history-title">
            Working History of {mainData.date}
          </Title>
          <Button className="chacked" hover>
            CHECKED <FontAwesomeIcon icon={faCheck} />
          </Button>
        </div>

        <Card>
          <AllMovies movies={mainData.movies} />
        </Card>
      </div>
    </React.Fragment>
  );
};

export default DownloadHistory;
