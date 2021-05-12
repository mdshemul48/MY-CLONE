import React from "react";

const Command = (props) => {
  return (
    <React.Fragment>
      <p className="folder input-title">{props.name}</p>
      <p
        className="folder-input folder"
        onClick={() => {
          navigator.clipboard.writeText(props.value);
        }}
      >
        {props.value}
      </p>
    </React.Fragment>
  );
};
export default Command;
