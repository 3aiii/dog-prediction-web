const connector = require("../server/connector");

module.exports = {
  predict: async (req, res) => {
    const { dog_id, breed_id, age, weight, height } = req.body;
    if (!dog_id || !breed_id || !age || !weight || !height) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const mysql = `INSERT INTO predict (dog_id, breed_id, age, weight, height) VALUES (?, ?, ?, ?, ?)`;

    connector.query(mysql, [dog_id, breed_id, age, weight, height], (err) => {
      if (err) {
        console.error("Error inserting prediction:", err.message);
        return res.status(500).send({ error: "Internal server error" });
      }
      res.send({ message: "Prediction created successfully" });
    });
  },
};
