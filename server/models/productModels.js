const { sql, poolPromise } = require("./database");



async function  getAllProduct(){
    try {
        const pool = await  poolPromise;
        const result = await pool
          .request()
          .query(
            `SELECT * FROM Products`
          );
        const product = result.recordset;
   
        if (product) {
          return { success: true, product };
        } else {
          return { success: false, message: "Fail to show all Products" };
        }
    } catch (error) {
        throw error;
    }
}

module.exports={
  getAllProduct,
};