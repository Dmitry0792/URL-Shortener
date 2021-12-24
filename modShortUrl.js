const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema(
  {
    longUrl: {
      type: String,
      require: true,
    },
    shortUrl: {
      type: String,
      require: true,
    },
    clicks: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("modShortUrl", shortUrlSchema);
