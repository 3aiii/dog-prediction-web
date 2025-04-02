const userController = require("../controllers/userController");

const userRoutes = require("express").Router();

userRoutes.get("/",userController.getUser);

module.exports = userRoutes;
