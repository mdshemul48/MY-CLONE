import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Command from "./Command";
import "./PubCommand.css";
import Button from "../../shared/components/UIElements/Button";
const PubCommand = (props) => {
  return (
    <React.Fragment>
      <Card className="publish-card">
        <h4>English movie Publish Command</h4>
        <hr />
        <Command
          name="FOLDER INPUT:"
          value="V:\.uploading 1tb\test pub\English"
        />
        <Command name="FOLDER OUTPUT:" value="V:\English Movies" />
        <Command
          name="FOLDER LINK:"
          value="http://index.circleftp.net/FILE/English%20Movies"
        />
        <Command name="PUBLISH CATEGORY:" value="3" />
        <hr />
        <Button warning className="publish-buttons">
          EDIT
        </Button>

        <Button danger className="publish-buttons">
          DELETE
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default PubCommand;
