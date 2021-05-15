const DownloadDate = require("../models/downloadDate");

const downloadHistoryAllDate = async (req, res, next) => {
  let allDates;
  try {
    allDates = await DownloadDate.find({}).sort({ _id: -1 });
  } catch (err) {
    return res.status(500).json({});
  }
  return res.json(allDates);
};

const dateAllMovies = async (req, res, next) => {
  const { dateId } = req.params;
  let allDates;
  try {
    allDates = await DownloadDate.findOne({ _id: dateId }).populate("movies");
  } catch (err) {
    return res.status(500).json({});
  }
  res.send(allDates);
};
exports.downloadHistoryAllDate = downloadHistoryAllDate;
exports.dateAllMovies = dateAllMovies;
