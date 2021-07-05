import React from "react";
import { Link } from "react-router-dom";
const TableElement = () => {
  return (
    <tr>
      <td>04-07-2021</td>
      <td>28 Movies</td>
      <td>
        {" "}
        <span className="table-status-text">pending</span>{" "}
      </td>
      <td>
        {" "}
        <span className="open">
          <Link to="/downloads/60e0a9886c0e2411e0d237f0">Open</Link>
        </span>{" "}
      </td>
    </tr>
  );
};

export default TableElement;
