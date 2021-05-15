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

exports.downloadHistoryAllDate = downloadHistoryAllDate;
