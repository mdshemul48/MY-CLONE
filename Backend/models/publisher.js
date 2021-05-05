const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const publisherSchema = new Schema({
  note: {
    type: String,
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  category: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Publisher", publisherSchema);
