const dogController = require("../controllers/dogController");
const dogRoutes = require("express").Router();

dogRoutes.get("/", dogController.gets);
dogRoutes.get("/top-5", dogController.top5);

module.exports = dogRoutes;