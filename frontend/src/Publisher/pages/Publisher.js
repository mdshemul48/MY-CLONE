import React, { useState, useEffect } from "react";

// castom imports
import MainPublishForm from "../components/MainPublishForm";
import PublishCommands from "../components/PublishCommands";
import Title from "../../shared/components/UIElements/Title";
import Loading from "../../shared/components/UIElements/Loading";
// css
import "./publisher.css";
const Publisher = () => {
  const [publishCommands, setPublishCommands] = useState();

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/publisher");
        const responseText = await response.json();
        setPublishCommands(responseText);
      } catch (e) {
        alert(e);
      }
    };
    fetchCommands();
  }, []);

  return (
    <div className="publisher">
      <Title>Publish Form</Title>
      <MainPublishForm />
      <Title>All publish commands</Title>
      {publishCommands ? (
        <PublishCommands commands={publishCommands.allEntry} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Publisher;
