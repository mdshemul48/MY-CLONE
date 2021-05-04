require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app = express();
app.use(bodyParser.json());

// --------------------- all routes -----------------------------
// responsible for all movie related work.
app.use("/api/movies", require("./routes/movies-routes"));

// responsible for all error related work.
app.use("/api/error", require("./routes/errors-routes"));

// --------------- connecting db and running the express server ------------
mongoose
  .connect(process.env.DATABACE_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(5000, () => {
      console.log("api rocking on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
