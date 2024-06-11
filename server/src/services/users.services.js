const { poolPromise, sql } = require("./database.services");
const bcrypt = require("bcrypt");
const authJwt = require("../middlewares/authJwt.middlewares");

async function loginUser(email, password) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`SELECT * FROM Users WHERE email = '${email}' AND status = 1`);
    const user = result.recordset[0];

    console.log("User from database:", user);

    if (user) {
      const isPasswordValid = password === user.password;
      console.log("Password comparison result:", isPasswordValid);

      if (isPasswordValid) {
        console.log("user.id:", user.id);
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
    const pool = await poolPromise;

    // Insert new user and get the inserted user_id
    const result = await pool
      .request()
      .query(
        `INSERT INTO Users (username, password, email, role_id) OUTPUT INSERTED.user_id VALUES ('${username}', '${password}', '${email}', 'customer')`
      );
    const user_id = result.recordset[0].user_id;
    console.log("registerUser user_id:", user_id); // Log the user_id

    // Generate JWT token
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

    return { success: true, message: "Voucher applied successfully" };
  } catch (error) {
    throw error;
  }
}

async function showAllVoucher() {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT code, discount, FORMAT(expiration_date, 'dd-MM-yyyy') as expiration_date
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
    SELECT v.discount, FORMAT(v.expiration_date, 'dd-MM-yyyy') AS expiration_date , uv.used FROM Vouchers v JOIN 
    User_Vouchers uv ON v.voucher_id = uv.voucher_id WHERE uv.user_id = ${user_id} AND uv.used = 0`);
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

module.exports = {
  loginUser,
  registerUser,
  applyVoucher,
  showAllVoucher,
  getVoucherByUserId,
  claimVoucher,
};
