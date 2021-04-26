import React from "react";

// importing css
import "./TableTh.css";
export default function TableTh() {
  return (
    <thead>
      <tr className="table-heading-tr">
        <th className="table-head column1">Title</th>
        <th className="table-head column2">Size</th>
        <th className="table-head column3">Done(%)</th>
        <th className="table-head column4">Language</th>
        <th className="table-head column5">Status</th>
        <th className="table-head column6">Speed</th>
        <th className="table-head column7">Manage</th>
      </tr>
    </thead>
  );
}
