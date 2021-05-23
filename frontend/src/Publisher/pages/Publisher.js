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
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/publisher/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(command),
        }
      );
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
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/publisher"
        );
        const responseText = await response.json();
        setPublishCommands(responseText.allEntry);
      } catch (e) {
        alert(e);
      }
    };
    fetchCommands();
  }, []);
  const deleteEntry = async (entryId) => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/publisher/delete/${entryId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      alert("something wrong with the publisher delete function.");
    }
    setPublishCommands((prev) =>
      prev.filter((command) => command._id !== entryId)
    );
  };
  return (
    <div className="publisher">
      <Title>Publish Form</Title>
      <MainPublishForm createNewCommand={createNewCommand} />
      <Title>All publish commands</Title>
      {publishCommands ? (
        <PublishCommands commands={publishCommands} deleteEntry={deleteEntry} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Publisher;
