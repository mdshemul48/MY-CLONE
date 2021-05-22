import React, { useState, useEffect } from "react";

import Loading from "../../shared/components/UIElements/Loading";
import Title from "../../shared/components/UIElements/Title";
import "./Downloads.css";
import DownloadHistory from "../components/DownloadHistory";
const Downloads = (props) => {
  const [mainData, setMainData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        response = await fetch("http://localhost:5000/api/download-page");
        const responseText = await response.json();
        setMainData(responseText);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, []);
  if (!mainData) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div className="download-history">
        <Title className="history-title">Downloads history</Title>
        <DownloadHistory downloads={mainData} />
      </div>
    </React.Fragment>
  );
};

export default Downloads;
