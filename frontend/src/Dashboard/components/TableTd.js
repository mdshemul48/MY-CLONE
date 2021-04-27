import React, { useState } from "react";

import "./TableTd.css";
import Button from "../../shared/components/UIElements/Button";

export default function TableTd(props) {
  const [resume, setResume] = useState(false);
  const resumePause = () => {
    setResume((prev) => !prev);
  };
  return (
    <tr className="contant-table">
      <td className="table-content column1">{props.title}</td>
      <td className="table-content column2">{props.size}</td>
      <td className="table-content column3">{props.percentage}</td>
      <td className="table-content column4">{props.lenguage}</td>
      <td className="table-content column5">{props.state}</td>
      <td className="table-content column6">{props.speed}</td>
      <td className="table-content column7">
        {resume ? (
          <Button className="buttons" onClick={resumePause}>
            RESUME
          </Button>
        ) : (
          <Button className="buttons" onClick={resumePause} warning>
            PAUSE
          </Button>
        )}

        <Button className="buttons" danger>
          DELETE
        </Button>
      </td>
    </tr>
  );
}
