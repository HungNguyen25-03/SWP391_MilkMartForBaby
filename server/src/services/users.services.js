const { poolPromise, sql } = require("./database.services");
const authJwt = require("../middlewares/authJwt.middlewares");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const refreshSecretKey = process.env.REFRESH_SECRET_KEY;

async function loginUser(email, password) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query(`SELECT * FROM Users WHERE email = @email AND status = 1`);
    const user = result.recordset[0];

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const tokens = await authJwt.generateToken(user.user_id);
        return { success: true, user, ...tokens };
      } else {
        return { success: false, message: "Invalid Email or password" };
      }
    } else {
      return { success: false, message: "User not found" };
    }
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw new Error("Database query failed");
  }
}

if (
  !process.env.EMAIL ||
  !process.env.EMAIL_PASSWORD ||
  !process.env.FRONTEND_URL
) {
  throw new Error("Missing required environment variables");
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const requestPasswordReset = async (email) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT user_id FROM Users WHERE email = @email AND status = 1");
    const user = result.recordset[0];

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600000); // Token valid for 1 hour

    await pool
      .request()
      .input("user_id", sql.Int, user.user_id)
      .input("token", sql.VarChar, token)
      .input("expires_at", sql.DateTime, expiresAt)
      .query(
        "INSERT INTO PasswordResetTokens (user_id, token, expires_at) VALUES (@user_id, @token, @expires_at)"
      );

    const mailOptions = {
      to: email,
      from: process.env.EMAIL,
      subject: "Password Reset Request For Milk Shop Online Store",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n
            You recently requested to reset your password. Click on the link below to change your password.\n
             ${process.env.FRONTEND_URL}/reset-password?token=${token}\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: "Password reset token sent" };
  } catch (error) {
    console.error("Error in requestPasswordReset:", error);
    throw new Error("Failed to request password reset");
  }
};

const resetPassword = async (token, newPassword) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("token", sql.VarChar, token)
      .query(
        "SELECT user_id, expires_at FROM PasswordResetTokens WHERE token = @token"
      );
    const resetToken = result.recordset[0];
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool
      .request()
      .input("user_id", sql.Int, resetToken.user_id)
      .input("password", sql.VarChar, hashedPassword)
      .query("UPDATE Users SET password = @password WHERE user_id = @user_id");

    await pool
      .request()
      .input("token", sql.VarChar, token)
      .query("DELETE FROM PasswordResetTokens WHERE token = @token");

    return { success: true, message: "Password reset successful" };
  } catch (error) {
    console.error("Error in resetPassword:", error);
    throw new Error("Failed to reset password");
  }
};

async function registerUser(username, password, email) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hashedPassword)
      .input("email", sql.VarChar, email)
      .input("role_id", sql.VarChar, "customer")
      .query(
        `INSERT INTO Users (username, password, email, role_id) OUTPUT INSERTED.user_id VALUES (@username, @password, @email, @role_id)`
      );
    const user_id = result.recordset[0].user_id;
    const tokens = await authJwt.generateToken(user_id);

    return {
      success: true,
      message: "User registered successfully",
      ...tokens,
    };
  } catch (error) {
    console.error("Error in registerUser:", error);
    throw error;
  }
}

async function applyVoucher(user_id, voucher_id) {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("voucher_id", sql.Int, voucher_id)
      .query(
        `UPDATE User_Vouchers SET used = 1 WHERE user_id = @user_id AND voucher_id = @voucher_id`
      );
    const result = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("voucher_id", sql.Int, voucher_id)
      .query(`SELECT * FROM Vouchers WHERE voucher_id = @voucher_id`);

    const voucher = result.recordset[0];
    return {
      success: true,
      voucher: voucher,
      message: "Voucher applied successfully",
    };
  } catch (error) {
    throw error;
  }
}

async function showAllVoucher() {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT voucher_id, code, discount, FORMAT(expiration_date, 'dd-MM-yyyy') as expiration_date
    FROM Vouchers;`);
    const vouchers = result.recordset;
    if (vouchers) {
      return { success: true, vouchers: vouchers };
    } else {
      return { success: false, message: "Fail to show vouchers" };
    }
  } catch (error) {
    throw error;
  }
}

async function getVoucherByUserId(user_id) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
    SELECT v.voucher_id, v.discount, FORMAT(v.expiration_date, 'dd-MM-yyyy') AS expiration_date , uv.used FROM Vouchers v JOIN 
    User_Vouchers uv ON v.voucher_id = uv.voucher_id WHERE uv.user_id = ${user_id}`);
    const vouchers = result.recordset;
    if (vouchers) {
      return { success: true, vouchers: vouchers };
    } else {
      return { success: false, message: "Fail to show vouchers" };
    }
  } catch (error) {
    throw error;
  }
}

async function claimVoucher(user_id, voucher_id) {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .query(
        `INSERT INTO User_Vouchers (user_id, voucher_id) VALUES ('${user_id}', '${voucher_id}')`
      );
    return { success: true, message: "Voucher claimed successfully" };
  } catch (error) {
    throw error;
  }
}

async function generateNewAccessToken(refreshToken) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("token", sql.VarChar, refreshToken)
      .query(`SELECT * FROM RefreshTokens WHERE token = @token`);

    const storedToken = result.recordset[0];
    if (!storedToken) return null;

    return new Promise((resolve, reject) => {
      jwt.verify(refreshToken, refreshSecretKey, (err, user) => {
        if (err) return resolve(null);

        const newAccessToken = jwt.sign({ userId: user.userId }, secretKey, {
          expiresIn: "1h",
        });
        resolve(newAccessToken);
      });
    });
  } catch (error) {
    console.error("Error in generateNewAccessToken:", error);
    throw new Error("Database query failed");
  }
}

async function readyToCheckout(user_id, total_amount, orderItems) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("order_date", sql.DateTime, new Date())
      .input("status", sql.VarChar, "pending")
      .input("total_amount", sql.Decimal, total_amount)
      .query(
        `INSERT INTO Orders (user_id, order_date, status, total_amount) OUTPUT INSERTED.order_id 
        VALUES (@user_id, @order_date, @status, @total_amount)`
      );
    const order_id = result.recordset[0].order_id;

    // insert order_items
    await insertOrderItems(order_id, orderItems);
    return {
      success: true,
      order_id: order_id,
      message: "Ready to checkout successfully",
    };
  } catch (error) {
    throw error;
  }
}

async function insertOrderItems(order_id, orderItems) {
  const pool = await poolPromise;

  for (const item of orderItems) {
    await pool
      .request()
      .input("order_id", sql.Int, order_id)
      .input("product_id", sql.Int, item.product_id)
      .input("quantity", sql.Int, item.quantity)
      .input("price", sql.Decimal, item.price)
      .query(
        `INSERT INTO Order_Items (order_id, product_id, quantity, price) 
        VALUES (@order_id, @product_id, @quantity, @price)`
      );
  }
}

async function reviewsByProductId(
  user_id,
  product_id,
  order_id,
  rating,
  comment
) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("product_id", sql.Int, product_id)
      .input("order_id", sql.Int, order_id)

      .input("rating", sql.Int, rating)
      .input("comment", sql.NVarChar, comment)
      .query(
        `INSERT INTO Reviews (user_id, product_id, order_id ,rating, comment) VALUES (@user_id, @product_id, @order_id, @rating, @comment)`
      );
    return { success: true, message: "Review added successfully" };
  } catch (error) {
    throw error;
  }
}

async function showReviewsByProductId(product_id) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("product_id", sql.Int, product_id)
      .query(
        `SELECT r.review_id, r.rating, r.comment, r.review_date, r.order_id, u.username, u.user_id FROM Reviews r JOIN Users u ON r.user_id = u.user_id WHERE r.product_id = @product_id`
      );
    const reviews = result.recordset;
    return { success: true, reviews: reviews };
  } catch (error) {
    throw error;
  }
}

async function completeOrder(order_id) {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("order_id", sql.Int, order_id)
      .query(
        `UPDATE Orders SET status = 'Completed' WHERE order_id = @order_id`
      );
    return { success: true, message: "Order completed successfully" };
  } catch (error) {
    throw error;
  }
}

async function reportProduct(
  user_id,
  product_id,
  order_id,
  report_description
) {
  try {
    const pool = await poolPromise;

    // Check if the user has already reported this product in this order
    const result = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("product_id", sql.Int, product_id)
      .input("order_id", sql.Int, order_id).query(`
        SELECT COUNT(*) AS count
        FROM Reports
        WHERE user_id = @user_id AND product_id = @product_id AND order_id = @order_id
      `);

    if (result.recordset[0].count > 0) {
      return {
        success: false,
        message: "You have already reported this product",
      };
    }

    // Insert the report into the database
    await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("product_id", sql.Int, product_id)
      .input("order_id", sql.Int, order_id)
      .input("report_description", sql.NVarChar(sql.MAX), report_description)
      .query(`
        INSERT INTO Reports (user_id, product_id, order_id, report_description)
        VALUES (@user_id, @product_id, @order_id, @report_description)
      `);
    return { success: true, message: "Report created successfully" };
  } catch (err) {
    console.error("Error creating report:", err);
    throw err;
  }
}

async function getPostById(post_id) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input("post_id", sql.Int, post_id)
      .query(`
      SELECT p.*, u.username FROM Posts p JOIN Users u ON p.user_id = u.user_id WHERE post_id = @post_id
    `);

    if (result.recordset.length === 0) {
      return { success: false, message: "Post not found" };
    }

    return { success: true, post: result.recordset[0] };
  } catch (error) {
    console.error("Error getting post by ID:", error);
    throw error;
  }
}

async function showAllPosts() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT p.*, u.username FROM Posts p JOIN Users u ON p.user_id = u.user_id
    `);

    return { success: true, posts: result.recordset };
  } catch (error) {
    console.error("Error getting all posts:", error);
    throw error;
  }
}

module.exports = {
  loginUser,
  registerUser,
  applyVoucher,
  showAllVoucher,
  getVoucherByUserId,
  claimVoucher,
  generateNewAccessToken,
  readyToCheckout,
  reviewsByProductId,
  showReviewsByProductId,
  completeOrder,
  reportProduct,
  getPostById,
  showAllPosts,
  requestPasswordReset,
  resetPassword,
};
