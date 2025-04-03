const connector = require("../server/connector");

module.exports = {
  gets: (req, res) => {
    try {
      connector.query("SELECT * FROM dogbreed", (err, result) => {
        if (err) {
          console.error("Error fetching dogs:", err.message);
          return res.status(500).send({ error: "Internal server error" });
        }
        if (result.length === 0) {
          return res.status(404).send({ message: "No dogs found" });
        }
        return res.status(200).send(result);
      });
    } catch (error) {
      return res.status(500).send({ error: "Internal server error" });
    }
  },
  top5: (req, res) => {
    return res.status(200).send({
      message: "Dog route",
    });
  },
};
