module.exports = {
  getUser: async (req, res) => {
    return res.send({ message: "User fetched successfully" });
    // const userId = req.params.id;
    // const query = "SELECT * FROM users WHERE id = ?";

    // await connector.query(query, [userId], (err, result) => {
    //   if (err) {
    //     console.error("Error fetching user:", err.message);
    //     return res.status(500).json({ error: "Internal server error" });
    //   }
    //   if (result.length === 0) {
    //     return res.status(404).json({ error: "User not found" });
    //   }
    //   res.status(200).json(result[0]);
    // });
  },
};
