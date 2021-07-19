import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
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

  const movieCount = moviesData.date || "";

  const checked = async () => {
    try {
      await axios.post(
        `/download-page/check/${dayId}`,
        {
          checked: !moviesData.checked,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      
      setMoviesData((prevState) => {
        return { ...prevState, checked: !prevState.checked };
      });

    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>History Of {movieCount} | MyClone</title>
      </Helmet>
      <Container className="p-lg-5 movies-area" fluid>
        <Container
          fluid
          className="d-flex justify-content-between check-area pb-2"
        >
          <h4 className="text-break">
            Working History Of {moviesData.date} (
            {moviesData?.movies?.length || 0})
          </h4>
          <Button
            variant={moviesData.checked ? "danger" : "success"}
            className="checkButton"
            onClick={checked}
          >
            {moviesData.checked ? "verified" : "verify"}
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
