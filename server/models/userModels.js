const { sql, poolPromise } = require("./database");
const bcrypt = require("bcrypt");

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
module.exports = {
  loginUser,
};
