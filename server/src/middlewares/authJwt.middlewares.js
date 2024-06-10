const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).send("Token is required");

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user;
    next();
  });
}

function generateToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
}

module.exports = {
  authenticateToken,
  generateToken,
};
