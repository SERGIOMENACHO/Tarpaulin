const routes = require("express").Router();
const enrollmentController = require("../controllers/enrollments");

// require the validation
const validation = require("../middleware/validation");

routes.get("/", enrollmentController.getAllEnrollments);

routes.get("/:id", enrollmentController.getOneEnrollment);

routes.post(
  "/create",
  validation.saveEnrollments,
  enrollmentController.createEnrollment
);

routes.put(
  "/:id",
  validation.saveEnrollments,
  enrollmentController.updateEnrollment
);

routes.delete("/:id", enrollmentController.deleteEnrollment);

module.exports = routes;
