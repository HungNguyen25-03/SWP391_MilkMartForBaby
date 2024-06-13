const jwt = require("jsonwebtoken");
const { poolPromise, sql } = require("../services/database.services");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;
const refreshSecretKey = process.env.REFRESH_SECRET_KEY;

async function authenticateToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).send("Token is required");

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user;
    next();
  });
}

async function generateToken(user_id) {
  const accessToken = jwt.sign({ user_id }, secretKey, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ user_id }, refreshSecretKey, {
    expiresIn: "7d",
  });

  await storeRefreshToken(refreshToken, user_id);
  return { accessToken, refreshToken };
}

async function storeRefreshToken(token, user_id) {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);

  const pool = await poolPromise;
  await pool
    .request()
    .input("token", sql.VarChar, token)
    .input("user_id", sql.Int, user_id)
    .input("expiryDate", sql.DateTime, expiryDate)
    .query(
      `INSERT INTO RefreshTokens (token, user_id, expiryDate) VALUES (@token, @user_id, @expiryDate)`
    );
}

async function findRefreshToken(token) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("token", sql.VarChar, token)
    .query(`SELECT * FROM RefreshTokens WHERE token = @token`);
  return result.recordset[0];
}

async function removeRefreshToken(token) {
  const pool = await poolPromise;
  await pool
    .request()
    .input("token", sql.VarChar, token)
    .query(`DELETE FROM RefreshTokens WHERE token = @token`);
}

async function authenticateRefreshToken(req, res, next) {
  const refreshToken = req.headers["x-refresh-token"];
  if (!refreshToken) return res.status(403).send("Refresh token is required");

  const storedToken = await findRefreshToken(refreshToken);
  if (!storedToken) return res.status(403).send("Invalid refresh token");

  jwt.verify(refreshToken, refreshSecretKey, (err, user) => {
    if (err) return res.status(403).send("Invalid refresh token");
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
  authenticateRefreshToken,
  generateToken,
  findRefreshToken,
  storeRefreshToken,
  removeRefreshToken,
};
