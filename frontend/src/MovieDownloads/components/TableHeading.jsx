import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const TableHeading = () => {
  return (
    <thead>
      <tr className="">
        <th className="table-header">
          Date <FontAwesomeIcon className="ml-2" icon={faCaretDown} />{" "}
        </th>
        <th className="table-header">
          Total Downloads{" "}
          <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
        </th>
        <th className="table-header">
          Status <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
        </th>
      </tr>
    </thead>
  );
};

export default TableHeading;
