const predictController = require("../controllers/predictController");

const predictRoutes = require("express").Router();

predictRoutes.post("/", predictController.predict);

module.exports = predictRoutes;