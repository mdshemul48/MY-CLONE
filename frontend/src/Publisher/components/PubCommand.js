import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Command from "./Command";
import "./PubCommand.css";
const PubCommand = (props) => {
  return (
    <React.Fragment>
      <Card>
        <h4>English movie Publish Command</h4>
        <hr />
        <Command />
      </Card>
    </React.Fragment>
  );
};

export default PubCommand;
