

const { poolPromise,sql } = require("./database.services");

async function createUser(username, password, email, role_id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('username', sql.VarChar, username)
        .input('password', sql.VarChar, password)
        .input('email', sql.VarChar, email)
        .input('role_id', sql.VarChar, role_id)
        .query(`
          INSERT INTO Users (username, password, email, role_id)
          VALUES (@username, @password, @email, @role_id);
        `);
      
      if (result.rowsAffected && result.rowsAffected[0] > 0) {
        return { success: true, message: 'User created successfully' };
      } else {
        return { success: false, message: 'Failed to create user' };
      }
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, message: 'Failed to create user', error: error.message };
   
}
}
module.exports = {
    createUser,
  };
  