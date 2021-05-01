require("dotenv").config();
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app = express();
app.use(bodyParser.json());

// --------------------- all routes -----------------------------
app.use("/api/movies", require("./routes/movies-routes"));

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
