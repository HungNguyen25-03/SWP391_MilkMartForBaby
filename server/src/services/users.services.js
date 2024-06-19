const { poolPromise, sql } = require("./database.services");
const authJwt = require("../middlewares/authJwt.middlewares");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    return { success: true, message: "Ready to checkout successfully" };
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

module.exports = {
  loginUser,
  registerUser,
  applyVoucher,
  showAllVoucher,
  getVoucherByUserId,
  claimVoucher,
  generateNewAccessToken,
  readyToCheckout,
};
