const { sql, poolPromise } = require("./database");


async function registerUser(username, password, email) {
  try {
    const pool = await poolPromise;
    const userResult = await pool
    //check if user exists
      .request()
      .input("username", sql.VarChar, username)
      .query(`SELECT * FROM Users WHERE username = '${username}'`);

    if (userResult.recordset.length > 0) {
      return { success: false, message: "Username already exists" };
    }

    //insert new user
    await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, password)
      .input("email", sql.VarChar, email)
      .query(
        `INSERT INTO Users (username, password, email, role_id) VALUES ('${username}', '${password}', '${email}', 'customer')`
      );

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
};