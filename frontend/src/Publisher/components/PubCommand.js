import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Command from "./Command";
import "./PubCommand.css";
import Button from "../../shared/components/UIElements/Button";
const PubCommand = (props) => {
  const { command } = props;
  return (
    <React.Fragment>
      <Card className="publish-card">
        <h4>{command.note}</h4>
        <hr />
        <Command name="FOLDER INPUT:" value={command.input} />
        <Command name="FOLDER OUTPUT:" value={command.output} />
        <Command name="FOLDER LINK:" value={command.link} />
        <Command name="PUBLISH CATEGORY:" value={command.category} />
        <hr />
        <Button danger className="publish-buttons">
          DELETE
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default PubCommand;
