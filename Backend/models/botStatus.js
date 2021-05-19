const mongoose = require("mongoose");

const botStatus = new mongoose.Schema({
  botName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Running",
  },
  StartingTime: {
    type: Date,
    default: Date.now,
  },
  StoppedTime: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("BotState", botStatus);
