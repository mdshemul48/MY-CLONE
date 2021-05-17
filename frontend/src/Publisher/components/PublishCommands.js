import React from "react";

import PubCommand from "./PubCommand";
const PublishCommands = (props) => {
  return (
    <div className="all-publish-commands">
      {props.commands.map((command) => {
        return <PubCommand key={command._id} command={command} />;
      })}
    </div>
  );
};

export default PublishCommands;
