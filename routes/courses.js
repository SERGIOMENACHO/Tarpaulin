const routes = require("express").Router();
const coursesController = require("../controllers/courses");

routes.post("/courses/create", coursesController.createCourse);

routes.get("/courses", coursesController.getAllCourses);

routes.get("/courses/:id", coursesController.getOneCourse);

routes.put("/courses/:id", coursesController.updateCourse);

routes.delete("/courses/:id", coursesController.deleteCourse);

module.exports = routes;
