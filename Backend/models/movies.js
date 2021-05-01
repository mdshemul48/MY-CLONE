const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const movieShema = new Schema({
  title: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  genres: {
    type: String,
    required: true,
  },
  imdbLink: {
    type: String,
    required: true,
  },
  downloadSearchResult: {
    type: String,
    required: true,
  },
  publishLink: {
    type: String,
    required: false,
  },
  publishPath: {
    type: String,
    required: false,
  },
  downloadTime: {
    type: Date,
    default: Date.now,
    required: false,
  },

  movieRating: {
    type: String,
    required: true,
  },
  creatorDate: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "",
  },
});

movieShema.plugin(uniqueValidator);

module.exports = mongoose.model("Movie", movieShema);
