const express = require("express");
const mongoose = require("mongoose");
const modShortUrl = require("./modShortUrl");
const shortid = require("shortid");

const app = express();

const urlencodedParser = express.urlencoded({ extended: false });

mongoose.connect("mongodb://localhost:27017/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = 5000;

const appdomen = "http://localhost:5000/";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index55.html");
});

app.get("/:urlCode", urlencodedParser, async (req, res) => {
  const { urlCode } = req.params;
  const df = await modShortUrl.findOne({ shortUrl: appdomen + urlCode });
  if (df !== null) {
    df.clicks++;
    df.save();
    res.redirect(df.longUrl);
  } else {
    res.sendStatus(404);
  }
});

app.post("/", urlencodedParser, async (req, res) => {
  const { longUrl } = req.body;

  const mfunc = async () => {
    const short = appdomen + shortid.generate();
    const check = await modShortUrl.findOne({ shortUrl: short });
    if (check == null) {
      const obj = { longUrl, shortUrl: short, clicks: 0 };
      await modShortUrl.create(obj);
      res.send(short);
    } else {
      console.log("rec");
      return mfunc();
    }
  };
  mfunc();
});

app.listen(PORT, () => console.log(`Server to ${PORT}`));
