import React from "react";

import "./SingleMovies.css";
const SingleMovie = (props) => {
  return (
    <div className="single-movie">
      <div className="poster-session">
        <img
          className="movie-poster"
          src="https://m.media-amazon.com/images/M/MV5BMTdkYWE4ZGQtOGZkMy00ZTg1LWE5ODEtZWRlMjQ3NWQ2N2I2XkEyXkFqcGdeQXVyNjU0NTI0Nw@@._V1_.jpg"
          alt="Girl.in.the.Basement.2021.1080p.WEB.h264-KOGi
          "
        />
      </div>
      <div className="data-session">
        <h4>Girl.in.the.Basement.2021.1080p.WEB.h264-KOGi</h4>
        <p class="language">English</p>
        <p class="genres">Thriller,Crime,</p>
        <p>
          <a
            class="imdb"
            href="https://www.imdb.com/title/tt13269536"
            target="_blank"
            rel="noopener noreferrer"
          >
            IMDB
          </a>
        </p>
        <h4 class="search-title">Search Results</h4>
        <div class="search-results"></div>
      </div>
    </div>
  );
};

export default SingleMovie;
