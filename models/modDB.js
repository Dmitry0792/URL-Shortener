const config = require("../config");
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  expireAt: {
    type: Date,
    index: { expires: config.expireAt },
    default: Date.now()
  },
  longUrl: {
    type: String
  },
  shortUrl: {
    type: String
  },
  clicks: {
    type: Number
  },
});

module.exports = mongoose.model("url", urlSchema);
