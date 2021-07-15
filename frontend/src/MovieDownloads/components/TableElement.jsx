import React from "react";
import { Link } from "react-router-dom";
const TableElement = (props) => {
  const {checked, date, __v, _id} = props.dayData
  return (
    <tr>
      <td>{date}</td>
      <td>{__v} Movies</td>
      <td>
        {" "}
        {checked ?<span className="table-status-text verified">Verified</span> : <span className="table-status-text">Panding</span>}
      </td>
      <td>
        {" "}
        <span className="open ">
          <Link to={`/downloads/${_id}`}>Open</Link>
        </span>{" "}
      </td>
    </tr>
  );
};

export default TableElement;
