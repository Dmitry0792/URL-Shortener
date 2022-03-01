const express = require("express");
const mongoose = require("mongoose");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger.json");
const config = require("./config");
const modDB = require("./models/modDB");

const app = express();

app.use(express.static("./client"));
app.use(express.json({extended: false}));

// Connect to db
mongoose
  .connect(config.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true,})
  .then((res) => console.log('Connected to DB'))
  .catch((err) => console.log(err));

// Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//Register endpoints
require("./api/index")(app, config.baseUrl, modDB);

app.listen(config.PORT, () => console.log(`Server started ${config.PORT}`));
