const { poolPromise, sql } = require("../services/database.services");

const registerUserMiddleware = async (req, res, next) => {
  try {
    const errors = [];
    const { username, password, confirmPassword, email, role_id } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username) {
      errors.push({
        name: "username",
        success: false,
        message: "Username is required",
        status: 400,
      });
    }

    if (!email) {
      errors.push({
        name: "email",
        success: false,
        message: "Email is required",
        status: 400,
      });
    }

    if (!password) {
      errors.push({
        name: "password",
        success: false,
        message: "Password is required",
        status: 400,
      });
    }

    if (!emailRegex.test(email)) {
      errors.push({
        name: "email",
        success: false,
        message: "Invalid email format",
        status: 400,
      });
    }

    if (password.length < 8 && password.length > 0) {
      errors.push({
        name: "password",
        success: false,
        message: "Password must be at least 8 characters long",
        status: 400,
      });
    }

    if (password && password.length > 20) {
      errors.push({
        name: "password",
        success: false,
        message: "Password must be less than 20 characters long",
        status: 400,
      });
    }

    if (password !== confirmPassword) {
      errors.push({
        name: "confirm password",
        success: false,
        message: "Passwords do not match",
        status: 400,
      });
    }

    const pool = await poolPromise;

    const userResult = await pool
      .request()
      .query(`SELECT * FROM Users WHERE username = '${username}'`);

    if (userResult.recordset.length > 0) {
      errors.push({
        name: "username",
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
        name: "email",
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

const requestPasswordResetMiddleware = async (req, res, next) => {
  try {
    const errors = [];
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.push({
        name: "email",
        success: false,
        message: "Email is required",
        status: 400,
      });
    }

    if (!emailRegex.test(email)) {
      errors.push({
        name: "email",
        success: false,
        message: "Invalid email format",
        status: 400,
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

const resetPasswordMiddleware = async (req, res, next) => {
  try {
    const errors = [];
    const pool = await poolPromise;
    const { token } = req.query;
    const { newPassword, confirmPassword } = req.body;
    const result = await pool
      .request()
      .input("token", sql.VarChar, token)
      .query(
        "SELECT user_id, expires_at FROM PasswordResetTokens WHERE token = @token"
      );
    const resetToken = result.recordset[0];

    if (!resetToken) {
      errors.push({
        name: "token",
        success: false,
        message: "Invalid or expired token",
        status: 400,
      });
    }
    if (resetToken.expires_at < new Date()) {
      errors.push({
        name: "token",
        success: false,
        message: "Token has expired",
        status: 400,
      });
    }
    if (!newPassword) {
      errors.push({
        name: "newPassword",
        success: false,
        message: "New password is required",
        status: 400,
      });
    }
    if (newPassword.length < 8 && newPassword.length > 0) {
      errors.push({
        name: "newPassword",
        success: false,
        message: "Password must be at least 8 characters long",
        status: 400,
      });
    }
    if (newPassword && newPassword.length > 20) {
      errors.push({
        name: "newPassword",
        success: false,
        message: "Password must be less than 20 characters long",
        status: 400,
      });
    }
    if (newPassword !== confirmPassword) {
      errors.push({
        name: "confirmPassword",
        success: false,
        message: "Passwords do not match",
        status: 400,
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

const applyVoucherMiddleware = async (req, res, next) => {
  try {
    const errors = [];
    const pool = await poolPromise;
    const { user_id, voucher_id } = req.body;

    // Validate voucher existence and expiration
    const result = await pool
      .request()
      .input("voucher_id", sql.Int, voucher_id)
      .query(
        `SELECT voucher_id, expiration_date FROM Vouchers WHERE voucher_id = @voucher_id`
      );

    if (result.recordset.length === 0) {
      errors.push({
        name: "voucher_id",
        success: false,
        message: "Voucher does not exist",
        status: 400,
      });
    } else {
      const voucher = result.recordset[0];
      const currentDate = new Date();

      if (new Date(voucher.expiration_date) < currentDate) {
        errors.push({
          name: "voucher_id",
          success: false,
          message: "Voucher has expired",
          status: 400,
        });
      }
    }

    // Validate if voucher is already used
    const usageResult = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("voucher_id", sql.Int, voucher_id)
      .query(
        `SELECT used FROM User_Vouchers WHERE user_id = @user_id AND voucher_id = @voucher_id`
      );

    if (usageResult.recordset.length > 0 && usageResult.recordset[0].used) {
      errors.push({
        name: "voucher_id",
        success: false,
        message: "Voucher has already been used",
        status: 400,
      });
    }

    // Check the existence of the user vouchers
    const userVoucherResult = await pool
      .request()
      .input("user_id", user_id)
      .input("voucher_id", voucher_id)
      .query(
        `SELECT * FROM User_Vouchers WHERE user_id = @user_id AND voucher_id = @voucher_id`
      );

    if (userVoucherResult.recordset.length === 0) {
      errors.push({
        name: "user_voucher",
        success: false,
        message: "User voucher does not exist",
        status: 400,
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

const claimVoucherMiddleware = async (req, res, next) => {
  try {
    const errors = [];
    const pool = await poolPromise;
    const { user_id, voucher_id } = req.body;
    if (!user_id) {
      errors.push({
        name: "user_id",
        success: false,
        message: "User ID is required",
        status: 400,
      });
    }

    if (!voucher_id) {
      errors.push({
        name: "voucher_id",
        success: false,
        message: "Voucher ID is required",
        status: 400,
      });
    }

    const result = await pool.request()
      .query(`SELECT voucher_id, expiration_date
       FROM Vouchers WHERE voucher_id = '${voucher_id}'`);

    if (result.recordset.length === 0) {
      errors.push({
        name: "voucher_id",
        success: false,
        message: "Voucher does not exist",
        status: 400,
      });
    } else {
      const voucher = result.recordset[0];
      const currentDate = new Date();

      if (new Date(voucher.expiration_date) < currentDate) {
        errors.push({
          name: "voucher_id",
          success: false,
          message: "Voucher has expired",
          status: 400,
        });
      }
    }

    const usageResult = await pool.request()
      .query(`SELECT used FROM User_Vouchers WHERE user_id = '${user_id}' 
    AND voucher_id = '${voucher_id}'`);

    if (
      usageResult.recordset.length > 0 &&
      usageResult.recordset[0].used === false
    ) {
      errors.push({
        name: "voucher_id",
        success: false,
        message: "Voucher has already been claimed",
        status: 400,
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

const reviewsByProductIdMiddlewares = async (req, res, next) => {
  try {
    const errors = [];
    const pool = await poolPromise;
    const { user_id, product_id, order_id } = req.body;
    const existingReview = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("product_id", sql.Int, product_id)
      .input("order_id", sql.Int, order_id)
      .query(
        `SELECT * FROM Reviews WHERE user_id = @user_id AND product_id = @product_id AND order_id = @order_id`
      );

    if (existingReview.recordset.length > 0) {
      errors.push({
        name: "review",
        success: false,
        message: "User has already reviewed this product in this order.",
        status: 400,
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

const completeOrderMiddlewares = async (req, res, next) => {
  try {
    const errors = [];
    const { order_id } = req.params.id;
    const pool = await poolPromise;
    const hasCompletedOrder = await pool
      .request()
      .input("order_id", order_id)
      .query(
        `SELECT * FROM Orders WHERE order_id = @order_id AND status = 'Completed'`
      );

    if (hasCompletedOrder.recordset.length > 0) {
      errors.push({
        name: "order",
        success: false,
        message: "Order has already been completed",
        status: 400,
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

module.exports = {
  registerUserMiddleware,
  applyVoucherMiddleware,
  claimVoucherMiddleware,
  reviewsByProductIdMiddlewares,
  completeOrderMiddlewares,
  resetPasswordMiddleware,
  requestPasswordResetMiddleware,
};
