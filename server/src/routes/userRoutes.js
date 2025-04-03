const userController = require("../controllers/userController");

const userRoutes = require("express").Router();

userRoutes.post("/login", userController.login);
userRoutes.post("/logout", userController.logout);
userRoutes.post("/verify", userController.verify);
userRoutes.get("/:id", userController.get);
userRoutes.put("/:id", userController.update);
userRoutes.delete("/:id", userController.remove);
userRoutes.get("/", userController.gets);
userRoutes.post("/", userController.create);

module.exports = userRoutes;
