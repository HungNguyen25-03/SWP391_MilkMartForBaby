const express = require("express");
const router = express.Router();

const { loginUser } = require("../models/userModels");

router.post("/login", async (req, res) => {
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

module.exports = router;
