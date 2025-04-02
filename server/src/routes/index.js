const { Router } = require("express");
const userRoutes = require("./userRoutes");

const rootRouter = Router();

rootRouter.use("/user", userRoutes);

module.exports = rootRouter;
