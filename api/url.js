const shortid = require("shortid");

module.exports = function (app, baseUrl, modDB) {
  
  // Create Short Url
  app.post("/createShortUrl", (req, res) => {
    const { longUrl } = req.body;

    const createShortUrl = async () => {
      const short = baseUrl + shortid.generate();
      const check = await modDB.findOne({ shortUrl: short });
      if (!check) {
        const obj = { longUrl, shortUrl: short, clicks: 0 };
        await modDB.create(obj);
        res.send(short);
      } else {
        console.log("rec");
        return createShortUrl();
      }
    };
    createShortUrl();
  });
};
