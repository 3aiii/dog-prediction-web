const connector = require("../server/connector");
const multer = require("multer");
const axios = require("axios");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const FormData = require("form-data");
require("dotenv").config();

const uploadSingle = upload.single("file");

module.exports = {
  predict: async (req, res) => {
    uploadSingle(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Error uploading file" });
      }

      const userId = req.params.id;
      const modelName = req.query.model || "cnnmodel";

      const formData = new FormData();
      formData.append("file", req.file.buffer, req.file.originalname);

      try {
        const response = await axios.post(
          `${process.env.FLASK_HOST}/predict?model=${modelName}`,
          formData,
          {
            headers: {
              ...formData.getHeaders(),
            },
          }
        );

        if (response.status === 200) {
          connector.query(
            `INSERT INTO prediction (image, model_used, percentage, user_id, breed_id) VALUES (?, ?, ?, ?, ?)`,
            [
              response.data.image_path,
              response.data.model,
              response.data.confidence,
              userId,
              response.data.breedId,
            ],
            (err, result) => {
              if (err) {
                return res.status(500).send({
                  error: "Something went wrong while saving the prediction",
                });
              }

              if (response.data.breedId === null) {
                return res.status(200).send({
                  message: "Prediction saved successfully",
                  prediction: {
                    ...response.data,
                    breedDetail: null,
                  },
                });
              }

              connector.query(
                `SELECT * FROM dogbreed WHERE breed_id = ?`,
                [response.data.breedId],
                (err, breedResult) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).send({
                      error: "Something went wrong while fetching the breed",
                    });
                  }

                  return res.status(200).send({
                    message: "Prediction saved successfully",
                    prediction: {
                      ...response.data,
                      breedDetail: breedResult[0],
                    },
                  });
                }
              );
            }
          );
        }
      } catch (error) {
        console.error("Error communicating with Flask:", error);
        return res.status(500).send({
          error: "Something went wrong while communicating with Flask",
        });
      }
    });
  },
  top5: async (req, res) => {
    const id = req.user.id;
    connector.query(
      `SELECT COUNT(breed_id) as count, breed_id FROM prediction 
      WHERE user_id = ? GROUP BY breed_id ORDER BY count DESC LIMIT 5`,
      [id],
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Something went wrong while fetching the predictions",
          });
        }

        return res.status(200).send({
          message: "Top 5 predictions fetched successfully",
          predictions: result,
        });
      }
    );
  },
};
