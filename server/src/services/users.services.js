const { poolPromise } = require("./database.services");

async function loginUser(email, password) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        `SELECT * FROM Users WHERE email = '${email}' AND password = '${password}'`
      );
    const user = result.recordset[0];

    if (user) {
      return { success: true, user };
    } else {
      return { success: false, message: "Invalid Email or password" };
    }
  } catch (error) {
    // console.log("Error logging", error);
    throw error;
  }
}

async function registerUser(username, password, email) {
  try {
    const pool = await poolPromise;
    const userResult = await pool
      //check if user exists
      .request()
      .query(`SELECT * FROM Users WHERE username = '${username}'`);

    if (userResult.recordset.length > 0) {
      return { success: false, message: "Username already exists" };
    }

    //insert new user
    await pool
      .request()
      .query(
        `INSERT INTO Users (username, password, email, role_id) VALUES ('${username}', '${password}', '${email}', 'customer')`
      );

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  loginUser,
  registerUser,
};
