const predictController = require("../controllers/predictController");

const predictRoutes = require("express").Router();

predictRoutes.post("/:id", predictController.predict);
predictRoutes.post("/top-5", predictController.top5);

module.exports = predictRoutes;