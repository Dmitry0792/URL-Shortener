const apiUrl = require("./url");

module.exports = function (app, baseUrl, modDB) {
  apiUrl(app, baseUrl, modDB);

  /**
   * @swagger
   * /:
   *  get:
   *    summary: Get home page
   *    responses: 
   *      200:
   *        description: Home page 
   * */
  app.get("/", (req, res) => {
    res.status(200).sendFile("/home/dmitry/23_12/myShortenerUrl/client/index.html");
  });


  /**
   * @swagger
   * /{urlCode}:
   *  get:
   *    summary: Redirect shortUrl --> longUrl
   *    parameters:
   *      - in: path
   *        name: urlCode
   *        schema:
   *          type: string
   *        required: true
   *        description: shortUrl
   *    responses: 
   *      200:
   *        description: DB has this code
   *        
   *      404:
   *        description: DB doesn't have this code
   * */
  app.get("/:urlCode", async (req, res) => {
    const { urlCode } = req.params;
    const shortUrl = baseUrl + urlCode;
    const check = await modDB.findOne({ shortUrl: shortUrl });
    if (check) {
      check.clicks++;
      check.save();
      res.redirect(check.longUrl);
      console.log(`Redirect (click:${check.clicks}): ${shortUrl}  -->  ${check.longUrl}`);
    } else {
      res.sendStatus(404);
      console.log(`Redirect failed: ${shortUrl}`);

    } 
  });
};
