const express = require("express");
const cors = require("cors");
const connector = require("./server/connector");
const rootRouter = require("./routes/index");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const startServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};

const connectDataBase = () => {
  try {
    connector.connect((err) => {
      if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
      }
      console.log("Connected to the database!");
    });
  } catch (error) {
    console.log("Failed to connect to the database:", error.message);
    process.exit(1);
  }
};

const main = async () => {
  connectDataBase();
  startServer();
};

app.use("/api", rootRouter);

main();
