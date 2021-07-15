import React, {useEffect} from "react";
import {useState, useDispatch} from "react-redux"
import { Container, Table } from "react-bootstrap";
import PageTitle from "../Title/PageTitle";
import TableHeading from "./components/TableHeading";
import TableElement from "./components/TableElement";
import downloadHistoryMethod from "../Store/asyncMethods/downloadHistoryMethod"

import "./MovieDownloads.css";

const MovieDownloads = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(downloadHistoryMethod())
  },[dispatch])
  
  return (
    <>
      <PageTitle>Downloads History</PageTitle>
      <Container className="mt-5 bg-light download-container">
        <Table responsive>
          <TableHeading />
          <tbody>
            <TableElement />
        
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default MovieDownloads;
