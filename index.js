const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const modDB = require("./models/modDB");

const app = express();

app.use(express.static("./client"));
app.use(express.urlencoded({ extended: false }));

// Connect to db
mongoose
  .connect(config.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true,})
  .catch((err) => console.log(err));

//Register endpoints
require("./api/index")(app, config.baseUrl, modDB);

app.listen(config.PORT, () => console.log(`Server started ${config.PORT}`));
