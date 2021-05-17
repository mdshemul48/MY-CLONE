import React, { useState, useEffect } from "react";

// castom imports
import Title from "../../shared/components/UIElements/Title";
import Loading from "../../shared/components/UIElements/Loading";
import "./QbitDownloadTable.css";
import TableTh from "./TableTh";
import TableTd from "./TableTd";

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
// qbit download api call
const fetchTorrentData = async (setMainData) => {
  const fetchData = await fetch("http://localhost:5000/api/torrent");
  const torrents = await fetchData.json();
  setMainData(torrents);
};

export default function QbitDownloadTable(props) {
  const [mainData, setMainData] = useState();

  useEffect(() => {
    fetchTorrentData(setMainData);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTorrentData(setMainData);
    }, 2000);
    return () => clearTimeout(timeoutId);
  });

  if (!mainData) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Title className="all-title">
        Qbit (Downloading) Status {mainData && <>({mainData.length} Movies)</>}
      </Title>
      <div className="main-table">
        <table className="full-table">
          <TableTh />
          <tbody>
            {mainData.map((item) => {
              return (
                <TableTd
                  key={item.hash}
                  title={item.name}
                  size={formatBytes(item.size)}
                  percentage={Math.floor(item.progress * 100) + "%"}
                  state={item.state}
                  language={item.category}
                  speed={formatBytes(item.dlspeed)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
