const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const checkHistory = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CheckHistory", checkHistory);
