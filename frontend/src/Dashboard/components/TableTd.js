import React from "react";

import "./TableTd.css";
import Button from "../../shared/components/UIElements/Button";
export default function TableTd() {
  return (
    <tr className="contant-table">
      <td className="table-content column1">
        Into.Our.Own.Hands.2010.FRENCH.1080p.WEBRip.x264-VXT
      </td>
      <td className="table-content column2">5.5GB</td>
      <td className="table-content column3">50%</td>
      <td className="table-content column4">English</td>
      <td className="table-content column5">Downloading</td>
      <td className="table-content column6">1.5MB/PS</td>
      <td className="table-content column7">
        <Button className="buttons" warning>
          PAUSE
        </Button>
        <Button className="buttons" danger>
          DELETE
        </Button>
      </td>
    </tr>
  );
}
