const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const movieShema = new Schema({
  title: {
    type: String,
    required: true,
  },
  language_name: {
    type: String,
    required: true,
  },
  genres: {
    type: String,
    required: true,
  },
  posterLink: {
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
  path: {
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
  status: {
    type: String,
    required: true,
  },
  creatorDate: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "creatorDate",
  },
});

movieShema.plugin(uniqueValidator);
movieShema.index({ title: "text" });
module.exports = mongoose.model("Movie", movieShema);
