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

  const createNewCommand = async (command) => {
    try {
      const response = await fetch("http://localhost:5000/api/publisher/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(command),
      });
      const responseText = await response.json();
      if (!responseText.successful) {
        console.log(responseText);
      }

      const newCommand = responseText.createdPublisherEntry;

      setPublishCommands((prev) => [newCommand, ...prev]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/publisher");
        const responseText = await response.json();
        setPublishCommands(responseText.allEntry);
      } catch (e) {
        alert(e);
      }
    };
    fetchCommands();
  }, []);

  console.log(publishCommands);
  return (
    <div className="publisher">
      <Title>Publish Form</Title>
      <MainPublishForm createNewCommand={createNewCommand} />
      <Title>All publish commands</Title>
      {publishCommands ? (
        <PublishCommands commands={publishCommands} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Publisher;
