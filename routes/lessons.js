const routes = require("express").Router();
const lessonsController = require("../controllers/lessons");

routes.post("/lessons/create", lessonsController.createLesson);

routes.get("/lessons", lessonsController.getAllLessons);

routes.get("/lessons/:id", lessonsController.getOneLesson);

routes.put("/lessons/:id", lessonsController.updateLesson);

routes.delete("/lessons/:id", lessonsController.deleteLesson);

module.exports = routes;
