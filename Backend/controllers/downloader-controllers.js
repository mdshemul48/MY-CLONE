const rarbgApi = require("rarbg-api/src/index");

const rarbg = async (req, res, next) => {
  let movies;
  try {
    movies = await rarbgApi.list({
      category: [44, 54],
    });
  } catch (err) {
    return res.status(500).json({ successful: false, message: err });
  }
  return res.status(200).json({ successful: true, movies });
};

exports.rarbg = rarbg;
