const rarbgApi = require("rarbg-api/src/index");

const rarbg = async (req, res, next) => {
  console.log("requesting");
  let movies;
  try {
    movies = await rarbgApi.list({
      category: [44, 54],
    });
  } catch (err) {
    return res.status(500).json({ successful: false, message: err });
  }
  console.log("sending data");
  return res.status(200).json({ successful: true, movies });
};

exports.rarbg = rarbg;
