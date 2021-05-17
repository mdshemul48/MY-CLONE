const dateFormat = require("dateFormat");
const mongoose = require("mongoose");
// db models
const Movie = require("../models/movies");
const MovieDate = require("../models/downloadDate");
const Check = require("../models/checkHistory");

const searchMovie = async (req, res, next) => {
  // this will search movie on db.
  const { movieTitle } = req.params;
  let movies;
  try {
    movies = await Movie.find(
      { $text: { $search: movieTitle } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });
  } catch (err) {
    return res.status(500).json({ successful: false, message: err });
  }

  return res.status(200).json({ successful: true, movies });
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
  return res.status(200).json({ successful: true, found: true, movie });
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
      movies: [],
    });
    await date.save();
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
    return res.status(409).json({
      successful: false,
      message: "Movie already exist in Databace.",
    });
  }

  const createdMovie = new Movie({
    title,
    language_name: language,
    genres,
    imdbLink,
    downloadSearchResult,
    movieRating,
    creatorDate: date.id,
    posterLink,
    status: "Downloading..",
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdMovie.save({ session: sess });
    date.movies.push(createdMovie.id);
    await date.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return res
      .status(501)
      .json({ successful: false, message: "creating fail." });
  }

  return res.status(201).json({ successful: true, createdMovie });
};

const checkMovie = async (req, res, next) => {
  // this will check if movie exist in the server
  // if exist the it will return true else false with movie insert in db
  const { movieTitle } = req.params;

  let movie;

  try {
    movie = await Check.findOne({ title: movieTitle });
  } catch (err) {
    return res.status(500).json({
      successful: false,
      message: "something wrong with checkmovie fuchtion.",
    });
  }

  if (movie) {
    return res.status(200).json({ successful: true, found: true, movie });
  }

  const createdMovie = new Check({
    title: movieTitle,
  });

  try {
    await createdMovie.save();
  } catch (err) {
    return res.status(500).json({
      successful: false,
      message: "something wrong with checkmovie fuchtion.",
    });
  }

  return res
    .status(200)
    .json({ successful: true, found: false, movie: createdMovie });
};

const editMovie = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    updatedMovie = await Movie.findOneAndUpdate({ title }, content);
    return res.json({ successful: true, movie: updatedMovie });
  } catch (err) {
    return res.status(500).json({ successful: false, err });
  }
};

exports.searchMovie = searchMovie;
exports.getMovieByTitle = getMovieByTitle;
exports.enterMovieIn = enterMovieIn;
exports.checkMovie = checkMovie;
exports.editMovie = editMovie;
