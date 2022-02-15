const shortid = require("shortid");

module.exports = function (app, baseUrl, modDB) {
  
  // Create Short Url
  /**
   * @swagger
   * /createShortUrl:
   *   post:
   *    summary: Create short Url
   *    requestBody: 
   *      required: true
   *      content: 
   *        application/json:
   *          schema: 
   *            type: object
   *            required: 
   *              - longUrl
   *            properties:
   *              longUrl:
   *                type: string 
   *            example:  
   *              longUrl: http://localhost:5001/
   *    responses: 
   *      '200':
   *         description: Created a pair longUrl --> shortUrl
   * 
   * */
  app.post("/createShortUrl", (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) {
      console.log('longurl field is empty');
      res.send('Enter URL');
    } else {
    const createShortUrl = async () => {
      const shortUrl = baseUrl + shortid.generate();
      const check = await modDB.findOne({ shortUrl: shortUrl });
      if (!check) {
        const obj = { longUrl, shortUrl: shortUrl, clicks: 0 };
        await modDB.create(obj);
        res.send(shortUrl);
        console.log(`Created a pair: shortUrl: ${shortUrl}, longUrl: ${longUrl}`);
      } else {
        console.log('This shortUrl exists, generate again');
        return createShortUrl();
      }
    };
    createShortUrl();
  }
  });
};
