import React from "react";

// castom imports
import MainPublishForm from "../components/MainPublishForm";
import PublishCommands from "../components/PublishCommands";
import Title from "../../shared/components/UIElements/Title";
// css
import "./publisher.css";
const Publisher = () => {
  return (
    <div className="publisher">
      <Title>Publish Form</Title>
      <MainPublishForm />
      <Title>All publish commands</Title>
      <PublishCommands />
    </div>
  );
};

export default Publisher;
