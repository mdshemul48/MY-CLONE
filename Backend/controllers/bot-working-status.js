const BotStatus = require("../models/botStatus");

const startingTime = async (req, res, next) => {
  const { botName, createdId } = req.body;

  if (!createdId) {
    const createdStatus = BotStatus({ botName });
    try {
      await createdStatus.save();
    } catch (err) {
      return res.json({ successful: true, err });
    }
    return res.json({ successful: true, createdStatus });
  }

  try {
    await BotStatus.findByIdAndUpdate(createdId, {
      status: "stopped",
      StoppedTime: new Date(),
    });
  } catch (err) {
    console.log(err);
    return res.json({ successful: true, err });
  }
  return res.json({ successful: true });
};

exports.startingTime = startingTime;
