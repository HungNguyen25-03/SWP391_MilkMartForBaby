const { poolPromise, sql } = require("./database.services");

async function createUser(username, password, email, role_id) {
  try {
    const pool = await poolPromise;
    //insert new user
    await pool.request().query(
      `INSERT INTO Users (username, password, email, role_id) VALUES 
        ('${username}', '${password}', '${email}', '${role_id}' )`
    );

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    throw error;
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

module.exports = {
  createUser,
  getUserById,
  getAllUser,
  DeleteUser,
  updateUser,
};
