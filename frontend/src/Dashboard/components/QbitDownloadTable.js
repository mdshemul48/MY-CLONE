import React from "react";

// qbit download table

// castom imports
import "./QbitDownloadTable.css";
import TableTh from "./TableTh";
import TableTd from "./TableTd";
export default function QbitDownloadTable(props) {
  const content = [
    {
      title: "Into.Our.Own.Hands.2010.FRENCH.1080p.WEBRip.x264-VXT",
      size: "5.5GB",
      percentage: "50%",
      lenguage: "English",
      state: "Downloading",
      speed: "1.5MB/PS",
    },
    {
      title: "Into.Our.Own.Hands.2010.FRENCH.1080p.WEBRip.x264-VXT",
      size: "5.5GB",
      percentage: "50%",
      lenguage: "English",
      state: "Downloading",
      speed: "1.5MB/PS",
    },
    {
      title: "Into.Our.Own.Hands.2010.FRENCH.1080p.WEBRip.x264-VXT",
      size: "5.5GB",
      percentage: "50%",
      lenguage: "English",
      state: "Downloading",
      speed: "1.5MB/PS",
    },
  ];

  return (
    <React.Fragment>
      <div className="main-table">
        <table className="full-table">
          <TableTh />
          <tbody>
            {content.map((item) => {
              return (
                <TableTd
                  title={item.title}
                  size={item.size}
                  percentage={item.percentage}
                  state={item.state}
                  lenguage={item.lenguage}
                  speed={item.speed}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
