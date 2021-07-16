import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import PageTitle from "../Title/PageTitle";
import MovieCard from "./components/MovieCard";

import axios from "../util/axiosConfig";

import "./DayDownloads.css";
const DayDownloads = () => {
  const [moviesData, setMoviesData] = useState({});
  const { dayId } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`/download-page/${dayId}`);
        setMoviesData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovies();
  }, [dayId]);

  return (
    <>
      <PageTitle>History Of 30-06-2021</PageTitle>
      <Container className="p-lg-5 movies-area" fluid>
        <Container
          fluid
          className="d-flex justify-content-between check-area pb-2"
        >
          <h4 className="text-break">
            Working History Of {moviesData.date} (
            {moviesData?.movies?.length || 0})
          </h4>
          <Button variant="success" className="checkButton">
            verify
            <FontAwesomeIcon className="ml-2" icon={faCheck} />{" "}
          </Button>
        </Container>

        <Container fluid>
          {moviesData?.movies?.map((movie) => {
            return <MovieCard key={movie._id} movie={movie} />;
          })}
        </Container>
      </Container>
    </>
  );
};

export default DayDownloads;
