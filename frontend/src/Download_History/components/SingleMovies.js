import React from "react";

import "./SingleMovies.css";
const SingleMovie = (props) => {
  const { movie } = props;
  return (
    <div className="single-movie">
      <div className="poster-session">
        <img
          className="movie-poster"
          src={movie.posterLink}
          alt="Girl.in.the.Basement.2021.1080p.WEB.h264-KOGi
          "
        />
      </div>
      <div className="data-session">
        <h4>{movie.title}</h4>
        <p class="language">{movie.language_name}</p>
        <p class="genres">{movie.genres}</p>
        <p>
          <a
            class="imdb"
            href={`https://www.imdb.com/title/tt${movie.imdbLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            IMDB
          </a>
        </p>
        <p>Status: {movie.status}</p>
        {movie.path && <p>Path: {movie.path}</p>}
        {movie.publishLink && (
          <p>
            link:{" "}
            <a
              class="imdb movie_publish-link"
              href={movie.publishLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {movie.publishLink}
            </a>
          </p>
        )}
        <p>Movie Rating: {movie.movieRating}</p>

        <h4 class="search-title">Search Results</h4>
        <div class="search-results">{movie.downloadSearchResult}</div>
      </div>
    </div>
  );
};

export default SingleMovie;
