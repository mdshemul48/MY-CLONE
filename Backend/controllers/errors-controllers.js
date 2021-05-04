const Error = require("../models/error");

const errorHandler = async (req, res, next) => {
  const { botName, errorText } = req.body;

  const createdError = new Error({
    botName,
    errorText,
  });

  try {
    await createdError.save();
    return res.status(201).json({ successful: true, createdError });
  } catch (err) {
    return res.status(500).json({ successful: false, message: err });
  }
};

exports.errorHandler = errorHandler;
