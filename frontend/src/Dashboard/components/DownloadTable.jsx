import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Container } from "react-bootstrap";
import TableBodyElement from "./TableBodyElement";
import formateBytes from "../../util/convertDataSize";
import DownloadingReducer from "../../Store/asyncMethods/downloadingMethods";

const DownloadTable = () => {
  const dispatch = useDispatch();
  const allDownloads = useSelector((state) => state.downloading.allDownloads);

  useEffect(() => {
    dispatch(DownloadingReducer());
  }, [dispatch]);

  useEffect(() => {
    const fetchTimeOut = setTimeout(() => {
      dispatch(DownloadingReducer());
    }, 5000);

    return () => clearTimeout(fetchTimeOut);
  });

  return (
    <Container fluid className="mt-3 p-2 bg-light rounded">
      <h5 className="mt-3 mb-3 text-dark">Qbit Torrent Status</h5>
      {allDownloads.length ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Size</th>
              <th>Done(%)</th>
              <th>Language</th>
              <th>Status</th>
              <th>Speed</th>
            </tr>
          </thead>
          <tbody>
            {allDownloads.map((item) => {
              return (
                <TableBodyElement
                  key={item.hash}
                  title={item.name}
                  size={formateBytes(item.size)}
                  parentage={Math.floor(item.progress * 100) + "%"}
                  language={item.category}
                  status={item.state}
                  speed={formateBytes(item.dlspeed)}
                />
              );
            })}
          </tbody>
        </Table>
      ) : (
        <h5 className="text-center mt-3 mb-4">Nothing Downloading on qbit.</h5>
      )}
    </Container>
  );
};

export default DownloadTable;
