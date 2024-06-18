const { poolPromise ,sql} = require("./database.services");

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

 async function getCompleteStatus(){
  try {
   const pool = await  poolPromise;
         const request = await pool.request();

         request.input('status', sql.NVarChar, 'Complete');
       
       
         const query =
          `SELECT * FROM Orders WHERE status=@status`
         ;
          const result=await request.query(query);
         const order = result.recordset;
       if(order){
         return { success: true, order };
       } else {
         return { success: false, message: "Fail to connect Order Complete Status" };
       }
  } catch (error) {
   throw error;
  }
 };

 

 async function getPendingStatus(){
  try {
   const pool = await  poolPromise;
         const request = await pool.request();

         request.input('status', sql.NVarChar, 'Pending');
       
       
         const query =
          `SELECT * FROM Orders WHERE status=@status`
         ;
          const result=await request.query(query);
         const order = result.recordset;
       if(order){
         return { success: true, order };
       } else {
         return { success: false, message: "Fail to connect Order Pending Status" };
       }
  } catch (error) {
   throw error;
  }
 };

 async function getConfirmStatus(){
  try {
   const pool = await  poolPromise;
         const request = await pool.request();

         request.input('status', sql.NVarChar, 'Confirmed');
       
       
         const query =
          `SELECT * FROM Orders WHERE status=@status`
         ;
          const result=await request.query(query);
         const order = result.recordset;
       if(order){
         return { success: true, order };
       } else {
         return { success: false, message: "Fail to connect Order Confirmed Status" };
       }
  } catch (error) {
   throw error;
  }
 };



 async function getDeliverStatus(){
  try {
   const pool = await  poolPromise;
         const request = await pool.request();

         request.input('status', sql.NVarChar, 'Delivered');
       
       
         const query =
          `SELECT * FROM Orders WHERE status=@status`
         ;
          const result=await request.query(query);
         const order = result.recordset;
       if(order){
         return { success: true, order };
       } else {
         return { success: false, message: "Fail to connect Order Delivered Status" };
       }
  } catch (error) {
   throw error;
  }
 };



 module.exports = {
    getAllOrder,
    getOrderById,
    getCompleteStatus,
    getPendingStatus,
    getConfirmStatus,
    getDeliverStatus
    
  };
  
