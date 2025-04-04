const dogController = require("../controllers/dogController");
const dogRoutes = require("express").Router();

dogRoutes.get("/", dogController.gets);

module.exports = dogRoutes;
