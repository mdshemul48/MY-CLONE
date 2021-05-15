const dateFormat = require("dateFormat");
const Movie = require("../models/movies");
const DownloadDate = require("../models/downloadDate");
const Error = require("../models/error");

const documentCounter = async (date, status) => {
  searchModal = {};

  if (date) {
    searchModal.downloadTime = { $gte: date };
  }

  if (status) {
    searchModal.status = status;
  }
  try {
    // getting todays movies added.
    const data = await Movie.countDocuments(searchModal);
    return data;
  } catch (err) {
    return 0;
  }
};

const gettingError = async (botName) => {
  try {
    const error = await Error.find({ botName: botName })
      .sort({ _id: -1 })
      .limit(15);
    return error;
  } catch (err) {
    return [];
  }
};
const frontPageData = async (req, res, next) => {
  let fullData = {};
  // getting todayDate
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // getting todays bot status
  const status = {};
  status.todayOnDownload = await documentCounter(today);

  status.TotalInDownload = await documentCounter(0, "Downloading..");

  status.TotalInUpload = await documentCounter(0, "uploading..");

  status.TotalInPublish = await documentCounter(0, "published..");

  status.allMovies = await documentCounter();
  fullData.status = status;
  // getting last 7days working info..
  const botWorkingData = [];

  for (let i = 0; i < 7; i++) {
    const dates = new Date();
    dates.setDate(dates.getDate() - i);

    const singleDate = new Date(
      dates.getFullYear(),
      dates.getMonth(),
      dates.getDate()
    );
    const todayDate = dateFormat(singleDate, "dd-mm-yyyy");

    try {
      const savenDay = await DownloadDate.findOne({ date: todayDate });

      botWorkingData.push({
        date: todayDate,
        download: savenDay.movies.length,
      });
    } catch (err) {
      botWorkingData.push({
        date: todayDate,
        download: 0,
      });
    }
  }
  fullData.botWorkingData = botWorkingData;
  //  getting message from error database
  const errors = {};
  errors.downloaderError = await gettingError("Downloader");
  errors.uploaderError = await gettingError("uploader");
  errors.publisherError = await gettingError("publisher");
  fullData.errors = errors;
  res.json(fullData);
};

exports.frontPageData = frontPageData;
