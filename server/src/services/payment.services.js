const { poolPromise, sql } = require("./database.services");

async function getOrderById(order_id) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("order_id", sql.Int, order_id)
      .query("SELECT * FROM Orders WHERE order_id = @order_id");
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

module.exports = { getOrderById, getAllPaymentMethods };
