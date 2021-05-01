const Movie = require("../models/movies");

const getMovieById = (req, res, next) => {
  // this will get movie from db

  return res.send("hello world");
};

const enterMovieIn = async (req, res, next) => {
  // this will add a movie to the db
  const {
    title,
    language,
    genres,
    imdbLink,
    downloadSearchResult,
    movieRating,
    downloadDate,
  } = req.body;

  const createdMovie = new Movie({
    title,
    language,
    genres,
    imdbLink,
    downloadSearchResult,
    movieRating,
    downloadDate,
  });
  try {
    await createdMovie.save();
    return res.json({ successful: true, createdMovie });
  } catch (err) {
    return res.json({ successful: false, message: err });
  }
};
exports.getMovieById = getMovieById;
exports.enterMovieIn = enterMovieIn;
