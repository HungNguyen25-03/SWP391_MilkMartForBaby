const { poolPromise, sql } = require("./database.services");

async function getAllOrder() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
    SELECT 
     Orders.order_id,
      CONVERT(VARCHAR, Orders.order_date, 105) AS order_date,
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

async function getOrderById(order_id) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`SELECT * FROM Products WHERE order_id='${order_id}'`);
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

async function getCompleteStatus() {
  try {
    const pool = await poolPromise;
    const request = await pool.request();
    request.input("status", sql.NVarChar, "Completed");

    const query = `SELECT 
      o.order_id,
      oi.order_item_id,
      p.product_id,
      p.product_name,
      p.description,
      oi.quantity,
      oi.price,
      o.total_amount,
      o.status
  FROM 
      Orders o
  JOIN 
      Order_Items oi ON o.order_id = oi.order_id
  JOIN 
      Products p ON oi.product_id = p.product_id
  WHERE 
      o.status = @status;
        `;
    const result = await request.query(query);

    const order = result.recordset;
    console.log(order);
    if (order) {
      return { success: true, order };
    } else {
      return {
        success: false,
        message: "Fail to connect Order Complete Status",
      };
    }
  } catch (error) {
    throw error;
  }
}

async function getPendingStatus() {
  try {
    const pool = await poolPromise;
    const request = await pool.request();

    request.input("status", sql.NVarChar, "Pending");

    const query = `SELECT * FROM Orders WHERE status = @status`;
    const result = await request.query(query);
    const order = result.recordset;
    if (order) {
      return { success: true, order };
    } else {
      return {
        success: false,
        message: "Fail to connect Order Pending Status",
      };
    }
  } catch (error) {
    throw error;
  }
}

async function getConfirmStatus() {
  try {
    const pool = await poolPromise;
    const request = await pool.request();

    request.input("status", sql.NVarChar, "Confirmed");

    const query = `SELECT * FROM Orders WHERE status = @status`;
    const result = await request.query(query);
    const order = result.recordset;
    if (order) {
      return { success: true, order };
    } else {
      return {
        success: false,
        message: "Fail to connect Order Confirmed Status",
      };
    }
  } catch (error) {
    throw error;
  }
}

async function getDeliverStatus() {
  try {
    const pool = await poolPromise;
    const request = await pool.request();

    request.input("status", sql.NVarChar, "Delivered");

    const query = `SELECT * FROM Orders WHERE status = @status`;
    const result = await request.query(query);
    const order = result.recordset;
    if (order) {
      return { success: true, order };
    } else {
      return {
        success: false,
        message: "Fail to connect Order Delivered Status",
      };
    }
  } catch (error) {
    throw error;
  }
}

async function getOrderByUserId(user_id) {
  try {
    const pool = await poolPromise;
    const request = pool.request();

    request.input("user_id", sql.Int, user_id);
    const orderQuery = `
      SELECT * FROM Orders 
      WHERE user_id = @user_id 
      AND status = 'completed'
    `;
    const orderResult = await request.query(orderQuery);
    const orders = orderResult.recordset;
    if (orders.length === 0) {
      return {
        success: false,
        message: "No completed orders found for the user",
      };
    }

    const orderWithProducts = [];

    for (const order of orders) {
      const productRequest = pool.request();
      productRequest.input("user_id", sql.Int, order.user_id);
      productRequest.input("order_id", sql.Int, order.order_id);
      const productQuery = `SELECT p.*, o.total_amount, oi. quantity 
      FROM Orders o JOIN Order_Items oi ON o.order_id = oi.order_id 
      JOIN Products p ON oi.product_id = p.product_id 
      WHERE o.user_id = @user_id AND o.order_id = @order_id
      AND status = 'completed'
      `;
      const productResult = await productRequest.query(productQuery);
      const products = productResult.recordset;

      orderWithProducts.push({ ...order, products });
    }

    return { success: true, orders: orderWithProducts };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllOrder,
  getOrderById,
  getCompleteStatus,
  getPendingStatus,
  getConfirmStatus,
  getDeliverStatus,
  getOrderByUserId,
};
