const error = require("../models/error");

const errorHandler = (req, res, next) => {
  res.send("hello world");
};

exports.errorHandler = errorHandler;
