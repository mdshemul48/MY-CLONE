import React from "react";

const TableBodyElement = (props) => {
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.size}</td>
      <td>{props.parentage}</td>
      <td>{props.language}</td>
      <td>{props.status}</td>
      <td>{props.speed}</td>
    </tr>
  );
};

export default TableBodyElement;
