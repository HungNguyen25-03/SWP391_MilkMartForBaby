

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

async function getUserById(user_id){
  try {
   const pool = await  poolPromise;
   const result = await pool.request()
   .input('user_id', sql.Int, user_id)
   .query(`
     SELECT * FROM Users WHERE user_id = @user_id;
   `);
       const user = result.recordset;
       if(user){
         return { success: true, user };
       } else {
         return { success: false, message: "Fail to connect User" };
       }
  } catch (error) {
   throw error;
  }
 };

 

 module.exports = {
  createUser,
  getUserById
  
};