const apiUrl = require("./url");

module.exports = function (app, baseUrl, modDB) {
  apiUrl(app, baseUrl, modDB);

  // Get home page
  app.get("/", (req, res) => {
    res.sendFile("/home/dmitry/23_12/myShortenerUrl/client/index.html");
  });

  // Redirect short url
  app.get("/:urlCode", async (req, res) => {
    const { urlCode } = req.params;
    const check = await modDB.findOne({ shortUrl: baseUrl + urlCode });
    if (check) {
      check.clicks++;
      check.save();
      res.redirect(check.longUrl);
    } else {
      res.sendStatus(404);
    }
  });
};
