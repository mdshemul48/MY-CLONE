const BotStatus = require("../models/botStatus");

const startingTime = async (req, res, next) => {
  const { botName, createdId } = req.body;

  if (!createdId) {
    const createdStatus = BotStatus({ botName });
    try {
      await createdStatus.save();
    } catch (err) {
      return res.status(500).json({ successful: false, err });
    }
    return res.json({ successful: true, createdStatus });
  }

  try {
    await BotStatus.findByIdAndUpdate(createdId, {
      status: "stopped",
      StoppedTime: new Date(),
    });
  } catch (err) {
    return res.status(500).json({ successful: false, err });
  }
  return res.json({ successful: true });
};

const botStatus = async (req, res, next) => {
  let downloader;
  let uploader;
  let publisher;
  try {
    downloader = await BotStatus.findOne({ botName: "downloader" }).sort({
      _id: -1,
    });
    uploader = await BotStatus.findOne({ botName: "uploader" }).sort({
      _id: -1,
    });
    publisher = await BotStatus.findOne({ botName: "publisher" }).sort({
      _id: -1,
    });
  } catch (err) {
    return res.status(500).json({ successful: false, err });
  }

  return res
    .status(200)
    .json({ successful: true, data: { downloader, uploader, publisher } });
};
exports.startingTime = startingTime;
exports.botStatus = botStatus;
