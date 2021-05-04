const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const errorSchema = new Schema({
  time: {
    type: Date,
    default: Date.now,
  },
  errorText: {
    type: String,
    required: true,
  },
  botName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Error", errorSchema);
