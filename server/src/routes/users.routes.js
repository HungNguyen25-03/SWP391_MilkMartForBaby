const express = require("express");
const { loginUser, registerUser } = require("../services/users.services");
const userRoutes = express.Router();

userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginUser(email, password);
    // console.log("result", result);
    if (result.success) {
      return res
        .status(200)
        .json({ message: "Login successful", user: result.user, status: 200 });
    } else {
      return res
        .status(401)
        .json({ message: "Invalid email or password", status: 401 });
    }
  } catch (err) {
    res.status(500).send("Error logging in user");
  }
});

userRoutes.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const user = await registerUser(username, password, email);
    if (user.success) {
      res.status(200).json({ message: user.message, status: 200 });
    } else {
      res.status(409).json({ message: user.message });
    }
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

module.exports = userRoutes;
