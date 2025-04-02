const mysql2 = require("mysql2");

const connector = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dog_project",
});

module.exports = connector;