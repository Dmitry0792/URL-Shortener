const shortid = require("shortid");
const modDB = require("../modDB");

module.exports = function(app, baseUrl) {
    app.get('/', (req, res) => {
        res.sendFile("/home/dmitry/23_12/myShortenerUrl/client/index.html");
    });

    app.post("/", (req, res) => {
        const { longUrl } = req.body;
      
        const createShortUrl = async () => {
          const short = baseUrl + shortid.generate();
          const check = await modDB.findOne({ shortUrl: short });
          if (!check) {
            const obj = { longUrl, shortUrl: short, clicks: 0 };
            await modDB.create(obj);
            res.send(short);
          } else {
            return createShortUrl();
          }
        };
        createShortUrl();
      });

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
   