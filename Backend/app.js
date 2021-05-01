const express = require("express");
const bodyParser = require("body-parser");
app = express();
app.use(bodyParser.json());

// --------------------- all routes -----------------------------
app.use("/api/movies", require("./routes/movies-routes"));

app.listen(5000);
