import React from "react";

const Command = (props) => {
  return (
    <React.Fragment>
      <p className="folder input-title">FOLDER INPUT:</p>
      <p
        className="folder-input folder"
        onClick={() => {
          navigator.clipboard.writeText(
            "V:\\.uploading 1tb\\test pub\\English"
          );
        }}
      >
        V:\.uploading 1tb\test pub\English
      </p>
    </React.Fragment>
  );
};
export default Command;
