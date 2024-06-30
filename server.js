const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

const app = express();
const port = 3000;

app
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    next();
  });

app.use("/", routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
