const connector = require("../server/connector");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: "All fields are required" });
    }

    let mysql = `SELECT user_id, fname, lname, email, password, role, createdAt FROM user WHERE email = ?`;

    connector.query(mysql, [email], async (err, result) => {
      if (err) {
        console.error("Error fetching user:", err.message);
        return res.status(500).send({ error: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(400).send({ error: "Invalid email or password" });
      }

      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ error: "Invalid email or password" });
      }

      delete user.password;

      const token = jwt.sign(
        { user_id: user.user_id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "3h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 3 * 60 * 60 * 1000,
      });

      return res.send({ token });
    });
  },
  logout: async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).send({ error: "No token provided" });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    return res.send({ message: "Logged out successfully" });
  },
  verify: async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
      return res.send({ error: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const userId = decoded.user_id;
      const query =
        "SELECT user_id,fname,lname,email,role,createdAt FROM user WHERE user_id = ?";

      connector.query(query, [userId], (err, result) => {
        if (err) {
          console.error("Error fetching user:", err.message);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(result[0]);
      });
    });
  },
  get: async (req, res) => {
    const userId = req.params.id;
    const query =
      "SELECT user_id,fname,lname,email,role,createdAt FROM user WHERE user_id = ?";
    connector.query(query, [userId], (err, result) => {
      if (err) {
        console.error("Error fetching user:", err.message);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(result[0]);
    });
  },
  gets: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const countQuery = "SELECT COUNT(*) AS total FROM user";
    const query = "SELECT * FROM user ORDER BY CreatedAt DESC LIMIT ? OFFSET ?";

    connector.query(countQuery, (countErr, countResult) => {
      if (countErr) {
        console.error("Error fetching total users count:", countErr.message);
        return res.status(500).send({ error: "Internal server error" });
      }

      const totalUsers = countResult[0].total;
      const totalPages = Math.ceil(totalUsers / limit);

      connector.query(query, [limit, offset], (err, result) => {
        if (err) {
          console.error("Error fetching users:", err.message);
          return res.status(500).send({ error: "Internal server error" });
        }

        if (result.length === 0) {
          return res.status(404).send({ error: "No users found" });
        }

        return res.status(200).send({
          data: result,
          currentPage: page,
          totalPages: totalPages,
        });
      });
    });
  },
  create: async (req, res) => {
    let { fname, lname, email, password, role } = req.body;
    if (!fname || !lname || !email || !password) {
      return res.status(400).send({ error: "All fields are required" });
    }

    if (!role) {
      role = "USER";
    }

    const existingUserQuery = `SELECT * FROM user WHERE email = ?`;

    connector.query(existingUserQuery, [email], async (err, result) => {
      if (err) {
        console.error("Error checking existing user:", err.message);
        return res.status(500).send({ error: "Internal server error" });
      }
      if (result.length > 0) {
        return res.status(400).send({ error: "Email already exists" });
      }

      let mysql = `INSERT INTO user (fname, lname, email, password, role) VALUES (?, ?, ?, ?, ?)`;
      let hashedPassword = await bcrypt.hash(password, saltRounds);
      try {
        connector.query(
          mysql,
          [fname, lname, email, hashedPassword, role],
          (err, result) => {
            if (err) {
              console.error("Error creating user:", err.message);
              return res.status(500).send({ error: "Internal server error" });
            }
            if (result.affectedRows === 0) {
              return res.status(400).send({ error: "User creation failed" });
            }

            return res.send({
              message: "User created successfully",
              userId: result.insertId,
            });
          }
        );
      } catch (error) {
        return res.status(500).send({ error: "Error hashing password" });
      }
    });
  },
  update: async (req, res) => {
    const userId = req.params.id;
    const { fname, lname, email, password, role } = req.body;

    if (!fname || !lname || !email) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const existingUserQuery = `SELECT * FROM user WHERE email = ? AND user_id != ?`;
    // Check if the email already exists for another user
    connector.query(existingUserQuery, [email, userId], async (err, result) => {
      if (err) {
        console.error("Error checking existing user:", err.message);
        return res.status(500).send({ error: "Internal server error" });
      }
      if (result.length > 0) {
        return res.status(400).send({ error: "Email already exists" });
      }

      const getUserQuery = `SELECT password, role FROM user WHERE user_id = ?`;

      // Fetch the current password and role of the user
      connector.query(getUserQuery, [userId], async (err, userData) => {
        if (err) {
          console.error("Error fetching user data:", err.message);
          return res.status(500).send({ error: "Internal server error" });
        }
        if (userData.length === 0) {
          return res.status(404).send({ error: "User not found" });
        }

        const currentPassword = password
          ? await bcrypt.hash(password, saltRounds)
          : userData[0].password;
        const currentRole = role || userData[0].role;

        try {
          const updateQuery = `UPDATE user SET fname = ?, lname = ?, email = ?, password = ?, role = ? WHERE user_id = ?`;
          // Update the user information
          connector.query(
            updateQuery,
            [fname, lname, email, currentPassword, currentRole, userId],
            (err, result) => {
              if (err) {
                console.error("Error updating user:", err.message);
                return res.status(500).send({ error: "Internal server error" });
              }
              if (result.affectedRows === 0) {
                return res.status(400).send({ error: "User update failed" });
              }

              return res.send({
                message: "User updated successfully",
                userId: userId,
              });
            }
          );
        } catch (error) {
          return res.status(500).send({ error });
        }
      });
    });
  },
  remove: async (req, res) => {
    const { id } = req.params;

    let mysql = "DELETE FROM user WHERE user_id = ?";

    try {
      connector.query(mysql, [id], (err, result) => {
        if (err) {
          return res.status(400).send({ message: err });
        }
        return res.send({ result });
      });
    } catch (error) {
      return res.send({ message: error });
    }
  },
};
