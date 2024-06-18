const { poolPromise, sql } = require("./database.services");

async function getOrderById(order_id) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("order_id", sql.Int, order_id)
      .query(`SELECT o.order_id, u.user_id, u.username, o.order_date, o.status, o.total_amount 
      FROM Orders o JOIN Users u ON o.user_id = u.user_id WHERE order_id = @order_id`);
    const order = result.recordset;
    if (order) {
      return { success: true, order };
    } else {
      return { success: false, message: "Fail to connect Order 2" };
    }
  } catch (error) {
    throw error;
  }
}

async function getAllPaymentMethods() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Payment_Methods");
    const paymentMethods = result.recordset;
    if (paymentMethods) {
      return { success: true, paymentMethods };
    } else {
      return { success: false, message: "Fail to connect Payment Methods" };
    }
  } catch (error) {}
}

async function getOrderItems(order_id) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("order_id", sql.Int, order_id)
      .query(
        `SELECT p.product_name, oi.quantity, oi.price 
        FROM Orders o JOIN Order_Items oi ON o.order_id = oi.order_id JOIN Products p 
        ON  oi.product_id = p.product_id WHERE o.order_id = @order_id
        `
      );
    const orderItems = result.recordset;
    if (orderItems) {
      return { success: true, orderItems };
    } else {
      return { success: false, message: "Fail to connect Order Items" };
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { getOrderById, getAllPaymentMethods, getOrderItems };
