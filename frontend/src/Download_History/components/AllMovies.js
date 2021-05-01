import React from "react";

import SingleMovie from "./SingleMovies";
import "./AllMovies.css";
const AllMovies = (props) => {
  return (
    <div className="AllMovies">
      <SingleMovie />
      <SingleMovie />
      <SingleMovie />
      <SingleMovie />
      <SingleMovie />
      <SingleMovie />
    </div>
  );
};
export default AllMovies;
