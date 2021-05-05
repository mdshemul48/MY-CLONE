// importing model
const Publisher = require("../models/publisher");

const createEntry = async (req, res, next) => {
  const { note, input, output, link, category } = req.body;

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

exports.createEntry = createEntry;
