const { poolPromise, sql } = require("./database.services");
const authJwt = require("../middlewares/authJwt.middlewares");
const bcrypt = require("bcrypt");

async function createUser(username, password, email, role_id) {
  try {
    const pool = await poolPromise;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hashedPassword)
      .input("email", sql.VarChar, email)
      .input("role_id", sql.VarChar, role_id)
      .query(
        `INSERT INTO Users (username, password, email, role_id) OUTPUT INSERTED.user_id VALUES (@username, @password, @email, @role_id)`
      );
    const user_id = result.recordset[0].user_id;
    const tokens = await authJwt.generateToken(user_id);

    return { success: true, message: "User registered successfully", ...tokens };
  } catch (error) {
    throw new Error("User creation failed: " + error.message);
  }
}

async function getUserById(user_id) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input("user_id", sql.Int, user_id)
      .query(`
     SELECT * FROM Users WHERE user_id = @user_id AND status = 1;
   `);
    const user = result.recordset;
    if (user) {
      return { success: true, user };
    } else {
      return { success: false, message: "Fail to connect User" };
    }
  } catch (error) {
    throw error;
  }
}

async function getAllUser() {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`SELECT * FROM Users WHERE status = 1`);
    const user = result.recordset;
    if (user) {
      return { success: true, user };
    } else {
      return { success: false, message: "Fail to get All User" };
    }
  } catch (error) {
    throw error;
  }
}

async function DeleteUser(user_id) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input("user_id", sql.Int, user_id)
      .query(`
     UPDATE Users SET status = 0 WHERE user_id = @user_id;
   `);
    const user = result.rowsAffected[0];
    console.log(user);
    console.log(result);
    if (user != 0) {
      return { success: true, user };
    } else {
      return { success: false, message: "Fail to delete User" };
    }
  } catch (error) {
    throw error;
  }
}

async function updateUser(user_id, username, password, email, role_id) {
  try {
    const pool = await poolPromise;
    const request = pool.request().input("user_id", user_id);

    let updateFields = [];

    if (username) {
      request.input("username", username);
      updateFields.push("username = @username");
    }

    if (password) {
      // Ensure password is hashed before this step
      request.input("password", password);
      updateFields.push("password = @password");
    }

    if (email) {
      request.input("email", email);
      updateFields.push("email = @email");
    }

    if (role_id) {
      request.input("role_id", role_id);
      updateFields.push("role_id = @role_id");
    }

    if (updateFields.length === 0) {
      return { success: false, message: "No fields to update" };
    }

    const query = `
      UPDATE Users
      SET ${updateFields.join(", ")}
      WHERE user_id = @user_id AND status = 1;
    `;

    const result = await request.query(query);

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return { success: true, message: "User updated successfully" };
    } else {
      return { success: false, message: "Failed to update user" };
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      message: "Failed to update user",
      error: error.message,
    };
  }
}

async function dashboard() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
    SELECT COUNT(*) as totalUsers FROM Users WHERE status = 1;
    SELECT COUNT(*) as totalProducts FROM Products WHERE status = 1;
    SELECT COUNT(*) as totalOrders FROM Orders WHERE status = 1;
  `);
    const totalUsers = result.recordsets[0][0].totalUsers;
    const totalProducts = result.recordsets[1][0].totalProducts;
    const totalOrders = result.recordsets[2][0].totalOrders;

    return { totalUsers, totalProducts, totalOrders };
  } catch (error) {
    console.error("Error getting dashboard data:", error);
    return {
      totalUsers: 0,
      totalProducts: 0,
      totalOrders: 0,
    };
  }
}

module.exports = {
  createUser,
  getUserById,
  getAllUser,
  DeleteUser,
  updateUser,
};
