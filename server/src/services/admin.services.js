const {poolPromisse}=require("./database.services");


async function createUser(username,password,email,role_id){
try{
    const pool = await poolPromise;
    const request = pool.request();
    
    // Add input parameters to prevent SQL injection
    request.input('username', sql.VarChar, username);
    request.input('password', sql.VarChar, password);
    request.input('email', sql.VarChar, email);
    request.input('role_id', sql.VarChar, role_id);

    const result = await request.query(`
        INSERT INTO Users (username, password, email, role_id)
        VALUES (@username, @password, @email, @role_id);
        
        SELECT SCOPE_IDENTITY() AS userId;
        `);
    const create=result.recordset[0].userId;
    if(create){
        console.log("Create user Success",create);
    }else{
        console.log("Fail to create 2 ");
    }
   


 } catch(error){
throw error;
}

}
module.exports = createUser;