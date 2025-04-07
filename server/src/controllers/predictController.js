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
        // console.error("Error communicating with Flask:", error);
        return res.status(500).send({
          messge: "Something went wrong while communicating with Flask",
          error
        });
      }
    });
  },
  top5: async (req, res) => {
    try {
      connector.query(
        `SELECT COUNT(breed_id) as count, breed_id FROM prediction 
       GROUP BY breed_id ORDER BY count DESC LIMIT 5`,
        [],
        (err, result) => {
          if (err) {
            return res.status(500).send({
              error: "Something went wrong while fetching the predictions",
            });
          }
          connector.query(
            `SELECT * FROM dogbreed WHERE breed_id IN (?)`,
            [result.map((item) => item.breed_id)],
            (err, breedResult) => {
              if (err) {
                return res.status(500).send({
                  error: "Something went wrong while fetching the breeds",
                });
              }

              result = result.map((item) => {
                const breedDetail = breedResult.find(
                  (breed) => breed.breed_id === item.breed_id
                );
                return { ...item, breedDetail };
              });

              return res.status(200).send({
                message: "Top 5 predictions fetched successfully",
                top5: result,
              });
            }
          );
        }
      );
    } catch (error) {
      return res.status(500).send({
        error: "Something went wrong while fetching the predictions",
      });
    }
  },
  history: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const countQuery = "SELECT COUNT(*) AS total FROM prediction";
    const query = `
      SELECT * FROM prediction 
      ORDER BY CreatedAt DESC 
      LIMIT ? OFFSET ?`;

    connector.query(countQuery, (countErr, countResult) => {
      if (countErr) {
        console.error("Error fetching total history count:", countErr.message);
        return res.status(500).send({ error: "Internal server error" });
      }

      const totalUsed = countResult[0].total;
      const totalPages = Math.ceil(totalUsed / limit);

      connector.query(query, [limit, offset], (err, result) => {
        if (err) {
          console.error("Error fetching history:", err.message);
          return res.status(500).send({ error: "Internal server error" });
        }

        if (result.length === 0) {
          return res.status(404).send({ error: "No history found" });
        }

        const userIds = result.map((item) => item.user_id);

        connector.query(
          `SELECT user_id,email FROM user WHERE user_id IN (?)`,
          [userIds],
          (userErr, userResult) => {
            if (userErr) {
              console.error("Error fetching users:", userErr.message);
              return res.status(500).send({ error: "Internal server error" });
            }

            const fullResult = result.map((item) => {
              const userDetail = userResult.find(
                (user) => user.user_id === item.user_id
              );

              return {
                ...item,
                userDetail,
              };
            });

            return res.status(200).send({
              history: fullResult,
              pagination: {
                currentPage: page,
                totalPages,
                totalItems: totalUsed,
              },
            });
          }
        );
      });
    });
  },

  getHistory: async (req, res) => {
    const predictionId = req.params.id;

    connector.query(
      `SELECT * FROM prediction WHERE prediction_id = ?`,
      [predictionId],
      (err, result) => {
        if (err) {
          console.error("Error fetching history:", err.message);
          return res.status(500).send({ error: "Internal server error" });
        }

        if (result.length === 0) {
          return res.status(404).send({ error: "No history found" });
        }

        const userId = result[0].user_id;
        const breedId = result[0].breed_id;

        connector.query(
          `SELECT user_id,fname,lname,email,role FROM user WHERE user_id = ?`,
          [userId],
          (userErr, userResult) => {
            if (userErr) {
              console.error("Error fetching users:", userErr.message);
              return res.status(500).send({ error: "Internal server error" });
            }

            connector.query(
              `SELECT * FROM dogbreed WHERE breed_id = ?`,
              [breedId],
              (breedErr, breedResult) => {
                if (breedErr) {
                  console.error("Error fetching breeds:", breedErr.message);
                  return res.status(500).send({
                    error: "Internal server error",
                  });
                }

                const fullResult = {
                  ...result[0],
                  userDetail: userResult[0],
                  breedDetail: breedResult[0],
                };

                return res.status(200).send({
                  history: fullResult,
                });
              }
            );
          }
        );
      }
    );
  },
};
