const dateFormat = require("dateFormat");
const mongoose = require("mongoose");
// db models
const Movie = require("../models/movies");
const MovieDate = require("../models/downloadDate");

const getMovies = (req, res, next) => {
  // this will get movie from db

  return res.send("hello world");
};

const getMovieByTitle = async (req, res, next) => {
  // this will get movie from db
  const { movieTitle } = req.params;
  let movie;
  try {
    movie = await Movie.findOne({ title: movieTitle });
  } catch (err) {
    return res
      .status(500)
      .json({ successful: false, message: "something wrong with the server" });
  }
  if (!movie) {
    return res.status(200).json({ successful: true, found: false });
  }
  return res.status(200).json({ successful: true, found: true, title: movie });
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
    posterLink,
  } = req.body;

  const now = new Date();
  const todayDate = dateFormat(now, "dd-mm-yyyy");
  let date;

  try {
    date = await MovieDate.findOne({ date: todayDate });
  } catch (err) {
    return res
      .status(500)
      .json({ successful: false, message: "something went wrong." });
  }
  if (!date) {
    date = new MovieDate({
      date: todayDate,
    });
  }

  let existingMovie;
  try {
    existingMovie = await Movie.findOne({ title });
  } catch (err) {
    return res.status(500).json({
      successful: false,
      message: "something went wrong.",
    });
  }

  if (existingMovie) {
    return res.json({
      successful: false,
      message: "Movie already exist in Databace.",
    });
  }

  const createdMovie = new Movie({
    title,
    language,
    genres,
    imdbLink,
    downloadSearchResult,
    movieRating,
    creatorDate: date,
    posterLink,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdMovie.save({ session: sess });
    date.movies.push(createdMovie);
    await date.save({ session: sess });
    await sess.commitTransaction();
    return res.status(201).json({ successful: true, createdMovie });
  } catch (err) {
    return res.status(500).json({ successful: false, message: err });
  }
};
exports.getMovies = getMovies;
exports.getMovieByTitle = getMovieByTitle;
exports.enterMovieIn = enterMovieIn;
