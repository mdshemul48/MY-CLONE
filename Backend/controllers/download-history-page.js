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
const checked = async (req, res, next) => {
  const { dateId } = req.params;
  const { checked } = req.body;
  try {
    await DownloadDate.findByIdAndUpdate(dateId, { checked });
  } catch (err) {
    return res.status(500).json({ error: err });
  }

  return res.json({ checked });
};
exports.downloadHistoryAllDate = downloadHistoryAllDate;
exports.dateAllMovies = dateAllMovies;
exports.checked = checked;
