const routes = require("express").Router();
const coursesController = require("../controllers/courses");

// require the validation
const validation = require("../middleware/validation");

routes.get("/", coursesController.getAllCourses);

routes.get("/:id", coursesController.getOneCourse);

routes.post("/create", validation.saveCourses, coursesController.createCourse);

routes.put("/:id", validation.saveCourses, coursesController.updateCourse);

routes.delete("/:id", coursesController.deleteCourse);

module.exports = routes;
