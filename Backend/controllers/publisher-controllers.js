// importing model
const Publisher = require("../models/publisher");

const createEntry = async (req, res, next) => {
  const { note, input, output, link, category } = req.body;
  let existedEntry;
  try {
    existedEntry = await Publisher.findOne({
      note,
      input,
      output,
      link,
      category,
    });
  } catch (err) {
    return res.status(500).json({ successful: false, err });
  }
  if (existedEntry) {
    return res
      .status(422)
      .json({ successful: true, message: "already exist." });
  }

  const createdPublisherEntry = new Publisher({
    note,
    input,
    output,
    link,
    category,
  });

  try {
    await createdPublisherEntry.save();
    return res.status(201).json({ successful: true, createdPublisherEntry });
  } catch (err) {
    return res.status(500).json({ successful: false, err });
  }
};

const getAllEntry = async (req, res, next) => {
  try {
    const allEntry = await Publisher.find({}).sort({ _id: -1 });
    return res.status(200).json({ successful: true, allEntry });
  } catch (err) {
    return res.status(500).json({ successful: false, err });
  }
};

const deleteEntry = async (req, res, next) => {
  const { entryId } = req.params;
  try {
    await Publisher.findByIdAndDelete(entryId);
  } catch (err) {
    return res.status(500).json({ successful: false, message: err });
  }
  return res.status(202).json({ successful: true, message: "deleted" });
};
exports.createEntry = createEntry;
exports.getAllEntry = getAllEntry;
exports.deleteEntry = deleteEntry;
