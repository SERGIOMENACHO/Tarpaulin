const routes = require("express").Router();

routes.use("/users", require("./users"));
routes.use("/courses", require("./courses"));
routes.use("/lessons", require("./lessons"));
routes.use("/enrollment", require("./enrollment"));

module.exports = routes;
