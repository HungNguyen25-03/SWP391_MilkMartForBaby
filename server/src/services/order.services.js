const { poolPromise } = require("./database.services");

async function getAllOrder() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
    SELECT 
     Orders.order_id,
     Orders.order_date,
     Users.username,
     Orders.status,
     Orders.total_amount

     FROM
     Orders
     JOIN
     Users
     
     ON
     Orders.user_id=Users.user_id;


    
    `);
    const order = result.recordset;

    if (order) {
      return { success: true, order };
    } else {
      return { success: false, message: "Fail to connect Order" };
    }
  } catch (error) {
    throw error;
  }
}

async function getOrderById(order_id){
  try {
   const pool = await  poolPromise;
         const result = await pool
         .request()
         .query(
          `SELECT * FROM Products WHERE order_id='${order_id}'`
         );
       const order = result.recordset;
       if(order){
         return { success: true, order };
       } else {
         return { success: false, message: "Fail to connect Order 2" };
       }
  } catch (error) {
   throw error;
  }
 };

 module.exports = {
    getAllOrder,
    getOrderById
    
  };
  
