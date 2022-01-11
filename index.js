const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();

app.use(express.static("./client"));
app.use(express.urlencoded({ extended: false }));

// Connect to db
mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//register endpoints
require("./api/urls")(app, config.baseUrl);

app.listen(config.PORT, () => console.log(`server started ${config.PORT}`));
