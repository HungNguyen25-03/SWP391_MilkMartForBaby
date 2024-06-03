const { poolPromise } = require("../services/database.services");

const registerUserMiddleware = async (req, res, next) => {
  try {
    const errors = [];
    const { username, password, email, role_id } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username) {
      errors.push({
        success: false,
        message: "Username is required",
        status: 400,
      });
    }

    if (!email) {
      errors.push({
        success: false,
        message: "Email is required",
        status: 400,
      });
    }

    if (!password) {
      errors.push({
        success: false,
        message: "Password is required",
        status: 400,
      });
    }

    if (!emailRegex.test(email)) {
      errors.push({
        success: false,
        message: "Invalid email format",
        status: 400,
      });
    }

    if (password.length < 8 && password.length > 0) {
      errors.push({
        success: false,
        message: "Password must be at least 8 characters long",
        status: 400,
      });
    }

    if (password && password.length > 20) {
      errors.push({
        success: false,
        message: "Password must be less than 20 characters long",
        status: 400,
      });
    }

    const pool = await poolPromise;

    const userResult = await pool
      .request()
      .query(`SELECT * FROM Users WHERE username = '${username}'`);

    if (userResult.recordset.length > 0) {
      errors.push({
        success: false,
        message: "Username already exists",
        status: 401,
      });
    }

    const userEmailResult = await pool
      .request()
      .query(`SELECT * FROM Users WHERE email = '${email}'`);

    if (userEmailResult.recordset.length > 0) {
      errors.push({
        success: false,
        message: "Email already exists",
        status: 401,
      });
    }

    if (errors.length > 0) {
      return next(errors);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUserMiddleware};
