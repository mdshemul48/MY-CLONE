import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faServer,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

import "./MovieCard.css";
const MovieCard = ({ movie }) => {
  // getting rating
  let movieRating;
  try {
    const rating = movie.movieRating.replaceAll("'", '"');
    movieRating = JSON.parse(rating);
  } catch (err) {
    movieRating = {
      certification: [],
    };
  }
  const searchResult = JSON.parse(
    movie.downloadSearchResult.replaceAll("'", '"') || []
  );
  return (
    <div className="row bg-light">
      <div className="col-lg-3 p-2">
        <img className="w-100 rounded" src={movie.posterLink} alt="" />
      </div>
      <div className="col-lg-9 text-wrap p-3 row">
        <div className="col-lg-7">
          <h5 className="text-break">{movie.title}</h5>

          <ul className="d-flex list-unstyled justify-content-left w-50 pr-lg-5 pr-sm-1">
            <li>
              <span>
                <FontAwesomeIcon icon={faLanguage} className="mr-2" size="lg" />
                {movie.language_name}
              </span>
            </li>
            <li className="ml-3">{movie.genres}</li>
          </ul>
          <span className="badge badge-dark mb-2">{movie.status}</span>

          {movie.path && (
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faServer} className="" size="lg" />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                defaultValue={movie.path}
              />
            </div>
          )}

          {movie.publishLink && (
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faLink} className="" size="lg" />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                defaultValue={movie.publishLink}
              />
            </div>
          )}
          <div>
            {movie.publishLink && (
              <a
                href={movie.publishLink}
                target="_blank"
                className="btn btn-dark text-light text-bold mr-3"
                rel="noreferrer"
              >
                <strong>OPEN IN FTP</strong>
              </a>
            )}
            <a
              href={`https://www.imdb.com/title/tt${movie.imdbLink}`}
              target="_blank"
              className="btn btn-warning text-light text-bold"
              rel="noreferrer"
            >
              <strong>IMDB</strong>
            </a>
          </div>
          <div className="mt-4">
            <h5 className="">Certification</h5>
            {movieRating.mpaa}
            <hr />
            {movieRating?.certification &&
              movieRating.certification.map((result) => {
                const background = result.includes("18")
                  ? "badge-danger"
                  : "badge-dark";
                return (
                  <span
                    key={Math.random()}
                    className={`badge badge-pill ${background} m-1`}
                  >
                    {result}
                  </span>
                );
              })}
          </div>
        </div>

        <div className="col-lg-5">
          <div className="mt-4">
            <h5>Search Results</h5>
            <hr />
            <div className="overflow-auto search-result">
              {searchResult.map((result) => (
                <a
                  key={Math.random()}
                  href={result.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  <p className="m-1">{result.title}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
