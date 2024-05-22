
const {sql, poolPromise}=require('./database');
const bcrypt = require('bcrypt');

async function loginUser(email,password){
    try {
    const pool=await poolPromise;
    const result=await pool.request() 
    .input('email', sql.VarChar, email)
    .query('SELECT * FROM Users WHERE email = @email');
    const user = result.recordset[0];

    if(user){
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return { success: true, user };
        }
        }else{
            return { success:false,message:'Invalid Email or password'};

    } 

    } catch (error) {
        console.log('Error logging',error);
        throw error;

    };
};
module.exports = {
    loginUser
  };