import React from "react";

import "./TableTd.css";
import Button from "../../shared/components/UIElements/Button";

export default function TableTd(props) {
  return (
    <tr className="contant-table">
      <td className="table-content column1">{props.title}</td>
      <td className="table-content column2">{props.size}</td>
      <td className="table-content column3">{props.percentage}</td>
      <td className="table-content column4">{props.language}</td>
      <td className="table-content column5">{props.state}</td>
      <td className="table-content column6">{props.speed}</td>
      <td className="table-content column7">
        <Button className="buttons" danger>
          DELETE
        </Button>
      </td>
    </tr>
  );
}
