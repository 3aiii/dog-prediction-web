const { Router } = require("express");
const userRoutes = require("./userRoutes");
const predictRoutes = require("./predictRoutes");
const dogRoutes = require("./dogRoutes");

const rootRouter = Router();

rootRouter.use("/dog", dogRoutes);
rootRouter.use("/user", userRoutes);
rootRouter.use("/predict", predictRoutes);

module.exports = rootRouter;
