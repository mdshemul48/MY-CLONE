const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const MovieDateSchema = new Schema({
  time: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  movies: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Movie",
    },
  ],
});
MovieDateSchema.plugin(uniqueValidator);

module.exports = mongoose.model("creatorDate", MovieDateSchema);
