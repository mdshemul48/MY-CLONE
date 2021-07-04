import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faServer,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import "./MovieCard.css";
const MovieCard = () => {
  const searchResult = [
    {
      title: "SEAL Team (TV Series 2017-)",
      link: "http://circleftp.net/cn/seal-team-tv-series-2017/",
    },
    {
      title: "Lets Meet Again on Christmas Eve 2020 1080p WEBRip x264",
      link: "http://circleftp.net/cn/lets-meet-again-on-christmas-eve-2020-1080p-webrip-x264/",
    },
    {
      title: "Pawn Stars (TV Series 2009– )",
      link: "http://circleftp.net/cn/pawn-stars-tv-series-2009/",
    },
    {
      title: "Little House on the Prairie (TV Series 1974–1983)",
      link: "http://circleftp.net/cn/little-house-on-the-prairie-tv-series-1974-1983/",
    },
    {
      title:
        "Taarak Mehta Ka Ooltah Chashmah (TV Series 2008-) (001-2900Episodes)",
      link: "http://circleftp.net/cn/taarak-mehta-ka-ooltah-chashmah-tv-series-2008-001-2900episodes/",
    },
    {
      title: "The Goldbergs (TV Series 2013-)",
      link: "http://circleftp.net/cn/the-goldbergs-tv-series-2013/",
    },
    {
      title: "Crossing Jordan (TV Series 2001– )",
      link: "http://circleftp.net/cn/crossing-jordan-tv-series-2001/",
    },
    {
      title: "The Golden Girls (TV Series 1985–1992)",
      link: "http://circleftp.net/cn/he-golden-girls-tv-series-1985-1992/",
    },
    {
      title: "American Housewife TV Series (2016– )",
      link: "http://circleftp.net/cn/american-housewife-tv-series-2016/",
    },
    {
      title: "Alfred Hitchcock Presents (TV Series 1955-1962)",
      link: "http://circleftp.net/cn/alfred-hitchcock-presents-tv-series-1955-1962/",
    },
    {
      title: "Family Matters (TV Series 1989-1998)",
      link: "http://circleftp.net/cn/family-matters-tv-series-1989-1998/",
    },
  ];

  const { certification } = {
    certification: [
      " Argentina:13",
      " Australia:MA15+",
      " Canada:14A",
      " (British Columbia)",
      " Canada:G",
      " (Quebec)",
      " Finland:K-12",
      " France:Tous publics",
      " Germany:Not Rated",
      " Germany:12",
      " Italy:T",
      " Japan:PG12",
      " Mexico:B15",
      " Netherlands:12",
      " New Zealand:R13",
      " Norway:12",
      " (2020, cinema rating)",
      " Philippines:R-13",
      " Portugal:M/14",
      " Singapore:R21",
      " South Korea:15",
      " Spain:12",
      " Sweden:11",
      " Switzerland:14",
      " United Kingdom:15",
      " United States:Not Rated",
    ],
  };
  return (
    <div className="card flex-lg-row mt-4">
      <div className="movie-poster-img">
        <img
          src="https://m.media-amazon.com/images/M/MV5BNDRjMzY0NWItZjc0Ny00OTgwLThhZmEtY2I1NGZmYmExYWRjXkEyXkFqcGdeQXVyMzU4ODM5Nw@@._V1_.jpg"
          className="card-img-top"
          alt="..."
        />
      </div>

      <div className="card-body">
        <h5 className="card-title">
          Menendez.Blood.Brothers.2017.1080p.WEBRip.x265-RARBG
        </h5>
        <ul className="d-flex list-unstyled justify-content-between w-50 pr-lg-5 pr-sm-1">
          <li>
            <span>
              <FontAwesomeIcon icon={faLanguage} className="mr-2" size="lg" />
              English
            </span>
          </li>
          <li>Drama,Crime,Biography,</li>
        </ul>
        <span class="badge badge-dark mb-2">Downloading..</span>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faServer} className="" size="lg" />
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            value="A:\.uploading_1tb\incoming\Portuguese\Eccentricities of a Blonde-haired Girl 2009 PORTUGUESE 1080p BluRay H264 AAC"
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faLink} className="" size="lg" />
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            value="http://circleftp.net/cn/menendez-blood-brothers-2017-1080p-webrip-x265/"
          />
        </div>

        <div>
          <a
            href="https://www.imdb.com/title/tt1013856"
            target="_blank"
            className="btn btn-dark text-light text-bold mr-3"
            rel="noreferrer"
          >
            <strong>OPEN IN FTP</strong>
          </a>
          <a
            href="https://www.imdb.com/title/tt1013856"
            target="_blank"
            className="btn btn-warning text-light text-bold"
            rel="noreferrer"
          >
            <strong>IMDB</strong>
          </a>
        </div>
      </div>
      <div className="mt-4">
        <h5>Search Results</h5>
        <hr />
        {searchResult.map((result) => (
          <a href={result.link} target="_blank" rel="noreferrer">
            {" "}
            <p className="m-1">{result.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
