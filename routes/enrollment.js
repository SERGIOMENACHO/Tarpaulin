const routes = require("express").Router();
const enrollmentController = require("../controllers/enrollment");

routes.post("/enrollment/create", enrollmentController.createEnrollment);

routes.get("/enrollment", enrollmentController.getAllEnrollments);

routes.get("/enrollment/:id", enrollmentController.getOneEnrollment);

routes.put("/enrollment/:id", enrollmentController.updateEnrollment);

routes.delete("/enrollment/:id", enrollmentController.deleteEnrollment);

module.exports = routes;
