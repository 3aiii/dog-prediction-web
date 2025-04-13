const predictController = require("../controllers/predictController");

const predictRoutes = require("express").Router();

predictRoutes.get("/top-5", predictController.top5);
predictRoutes.get("/history", predictController.history);
predictRoutes.get("/:id", predictController.getHistory);
predictRoutes.post("/:id", predictController.predict);
predictRoutes.get("/getByUserId/:id", predictController.getHistoryByUserId);

module.exports = predictRoutes;
