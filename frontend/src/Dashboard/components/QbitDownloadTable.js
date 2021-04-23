import React from "react";

// qbit download table

// castom imports
import "./QbitDownloadTable.css";
import TableTh from "./TableTh";
import TableTd from "./TableTd";
export default function QbitDownloadTable(props) {
  return (
    <React.Fragment>
      <div className="main-table">
        <table className="full-table">
          <TableTh />
          <tbody>
            <TableTd />
            <TableTd />
            <TableTd />
            <TableTd />
            <TableTd />
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
