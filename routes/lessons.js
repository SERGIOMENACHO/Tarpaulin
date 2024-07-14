const routes = require("express").Router();
const lessonsController = require("../controllers/lessons");

// require the validation
const validation = require("../middleware/validation");

routes.get("/", lessonsController.getAllLessons);

routes.get("/:id", lessonsController.getOneLesson);

routes.post("/create", validation.saveLessons, lessonsController.createLesson);

routes.put("/:id", validation.saveLessons, lessonsController.updateLesson);

routes.delete("/:id", lessonsController.deleteLesson);

module.exports = routes;
