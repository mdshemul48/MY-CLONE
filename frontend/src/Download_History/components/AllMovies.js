import React from "react";

import SingleMovie from "./SingleMovies";
import "./AllMovies.css";
const AllMovies = (props) => {
  return (
    <div className="AllMovies">
      {props.movies.map((movie) => {
        return <SingleMovie movie={movie} />;
      })}
    </div>
  );
};
export default AllMovies;
