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
  fullData.todayTotal = await documentCounter(today);

  fullData.todayDownload = await documentCounter(today, "Downloading..");

  fullData.todayUpload = await documentCounter(today, "uploading..");

  fullData.todayPublish = await documentCounter(today, "published..");

  fullData.allTimeMovies = await documentCounter();

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
  fullData.downloaderError = await gettingError("Downloader");
  fullData.uploaderError = await gettingError("uploader");

  res.json(fullData);
};

exports.frontPageData = frontPageData;
