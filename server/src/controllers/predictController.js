const connector = require("../server/connector");
const multer = require("multer");
const axios = require("axios");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const FormData = require("form-data");

const uploadSingle = upload.single("file");

module.exports = {
  predict: async (req, res) => {
    uploadSingle(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Error uploading file" });
      }

      const modelName = req.query.model || "cnnmodel";

      const formData = new FormData();
      formData.append("file", req.file.buffer, req.file.originalname);

      try {
        const response = await axios.post(
          `http://localhost:5000/predict?model=${modelName}`,
          formData,
          {
            headers: {
              ...formData.getHeaders(),
            },
          }
        );

        return res.send(response.data);
      } catch (error) {
        console.error("Error sending to Flask:", error);
        res.status(500).send({
          error: "Something went wrong while communicating with Flask",
        });
      }
    });
  },
};
