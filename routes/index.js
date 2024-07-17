const routes = require("express").Router();

routes.use("/courses", require("./courses"));
routes.use("/lessons", require("./lessons"));
routes.use("/enrollments", require("./enrollments"));
routes.use("/", require("./users"));


module.exports = routes;
