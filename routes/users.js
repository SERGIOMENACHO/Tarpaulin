const routes = require("express").Router();
const usersController = require("../controllers/users");

routes.post("/users/create", usersController.createUser);

routes.get("/users", usersController.getAllUsers);

routes.get("/users/:id", usersController.getOneUser);

routes.put("/users/:id", usersController.updateUser);

routes.delete("/users/:id", usersController.deleteUser);

module.exports = routes;
