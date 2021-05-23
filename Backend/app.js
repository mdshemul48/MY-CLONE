require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
app.use(express.static(path.join(__dirname, "public")));
// --------------------- all routes -----------------------------
// responsible for all movie related work.
app.use("/api/movies", require("./routes/movies-routes"));

// responsible for all error related work.
app.use("/api/error", require("./routes/errors-routes"));

// responsible for publish data related work.
app.use("/api/publisher", require("./routes/publisher-routes"));

app.use("/api/downloader", require("./routes/downloader-routes"));

// responsible for all frontend related work.
app.use("/api/front-page", require("./routes/front-page-routes"));

// responsible for all frontend download history related work.
app.use("/api/download-page", require("./routes/download-page-routes"));

// responsible for all frontend torrent client related work.
app.use("/api/torrent", require("./routes/torrent-client-routes"));

// responsible for all frontend bot working status related work.
app.use("/api/bot-status", require("./routes/botRunning-routes"));

// responsible for all frontend signup and login related work.
app.use("/api/auth", require("./routes/user-routes"));

// frontend
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
// --------------- connecting db and running the express server ------------
mongoose
  .connect(process.env.DATABACE_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(5000, "0.0.0.0");
  })
  .catch((err) => {
    console.log(err);
  });
