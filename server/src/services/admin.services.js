const { poolPromise, sql } = require("./database.services");
const authJwt = require("../middlewares/authJwt.middlewares");
const bcrypt = require("bcrypt");

async function createUser(username, password, email, role_id) {
  try {
    const pool = await poolPromise;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hashedPassword)
      .input("email", sql.VarChar, email)
      .input("role_id", sql.VarChar, role_id)
      .query(
        `INSERT INTO Users (username, password, email, role_id) OUTPUT INSERTED.user_id VALUES (@username, @password, @email, @role_id)`
      );
    const user_id = result.recordset[0].user_id;
    const tokens = await authJwt.generateToken(user_id);

    return {
      success: true,
      message: "User registered successfully",
      ...tokens,
    };
  } catch (error) {
    throw new Error("User creation failed: " + error.message);
  }
}

async function getUserById(user_id) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input("user_id", sql.Int, user_id)
      .query(`
     SELECT * FROM Users WHERE user_id = @user_id AND status = 1;
   `);
    const user = result.recordset;
    if (user) {
      return { success: true, user };
    } else {
      return { success: false, message: "Fail to connect User" };
    }
  } catch (error) {
    throw error;
  }
}

async function getAllUser() {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`SELECT * FROM Users WHERE status = 1`);
    const user = result.recordset;
    if (user) {
      return { success: true, user };
    } else {
      return { success: false, message: "Fail to get All User" };
    }
  } catch (error) {
    throw error;
  }
}

async function DeleteUser(user_id) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input("user_id", sql.Int, user_id)
      .query(`
     UPDATE Users SET status = 0 WHERE user_id = @user_id;
   `);
    const user = result.rowsAffected[0];
    console.log(user);
    console.log(result);
    if (user != 0) {
      return { success: true, user };
    } else {
      return { success: false, message: "Fail to delete User" };
    }
  } catch (error) {
    throw error;
  }
}

async function updateUser(user_id, username, password, email, role_id) {
  try {
    const pool = await poolPromise;
    const request = pool.request().input("user_id", user_id);

    let updateFields = [];

    if (username) {
      request.input("username", username);
      updateFields.push("username = @username");
    }

    if (password) {
      // Ensure password is hashed before this step
      request.input("password", password);
      updateFields.push("password = @password");
    }

    if (email) {
      request.input("email", email);
      updateFields.push("email = @email");
    }

    if (role_id) {
      request.input("role_id", role_id);
      updateFields.push("role_id = @role_id");
    }

    if (updateFields.length === 0) {
      return { success: false, message: "No fields to update" };
    }

    const query = `
      UPDATE Users
      SET ${updateFields.join(", ")}
      WHERE user_id = @user_id AND status = 1;
    `;

    const result = await request.query(query);

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return { success: true, message: "User updated successfully" };
    } else {
      return { success: false, message: "Failed to update user" };
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      message: "Failed to update user",
      error: error.message,
    };
  }
}

async function dashboard(startDate, endDate) {
  try {
    const pool = await poolPromise;

    // Extract year and month from startDate and endDate
    const [startYear, startMonth] = startDate.split("-").map(Number);
    const [endYear, endMonth] = endDate.split("-").map(Number);

    // Calculate the start and end date strings in the required format
    const startDateString = `${startMonth
      .toString()
      .padStart(2, "0")}-01-${startYear}`;
    const endDateString = `${(endMonth + 1)
      .toString()
      .padStart(2, "0")}-01-${endYear}`;

    // Query total orders within the specified month-year range
    const totalOrdersResult = await pool
      .request()
      .input("startDateString", sql.DateTime, startDateString)
      .input("endDateString", sql.DateTime, endDateString).query(`
        SELECT COUNT(*) AS totalOrders 
        FROM Orders 
        WHERE order_date >= @startDateString AND order_date < @endDateString
        AND status IN ('Paid', 'Delivered', 'Completed', 'Confirmed');
      `);
    const totalOrders = totalOrdersResult.recordset[0].totalOrders;

    // Query total revenue within the specified month-year range
    const totalRevenueResult = await pool
      .request()
      .input("startDateString", sql.DateTime, startDateString)
      .input("endDateString", sql.DateTime, endDateString).query(`
        SELECT SUM(total_amount) AS totalRevenue 
        FROM Orders 
        WHERE order_date >= @startDateString AND order_date < @endDateString
        AND status IN ('Paid', 'Delivered', 'Completed', 'Confirmed');
      `);
    const totalRevenue = totalRevenueResult.recordset[0].totalRevenue;

    // Query top 5 best-selling products within the specified month-year range
    const topProductsResult = await pool
      .request()
      .input("startDateString", sql.DateTime, startDateString)
      .input("endDateString", sql.DateTime, endDateString).query(`
        SELECT TOP 5 P.*, SUM(OI.quantity) AS totalSold 
        FROM Order_Items OI
        JOIN Products P ON OI.product_id = P.product_id
        JOIN Orders O ON OI.order_id = O.order_id
        WHERE O.order_date >= @startDateString AND O.order_date < @endDateString
        AND O.status IN ('Paid', 'Delivered', 'Completed', 'Confirmed')
        GROUP BY P.product_id, P.product_name
        ORDER BY totalSold DESC;
      `);
    const topProducts = topProductsResult.recordset;

    // Query total successful orders per month within the specified month-year range
    const successfulOrdersPerMonthResult = await pool
      .request()
      .input("startDateString", sql.DateTime, startDateString)
      .input("endDateString", sql.DateTime, endDateString).query(`
        SELECT 
          YEAR(order_date) AS year, 
          MONTH(order_date) AS month, 
          COUNT(*) AS successfulOrders 
        FROM Orders 
        WHERE order_date >= @startDateString AND order_date < @endDateString
        AND status IN ('Paid', 'Delivered', 'Completed', 'Confirmed')
        GROUP BY YEAR(order_date), MONTH(order_date)
        ORDER BY year, month;
      `);
    const successfulOrdersPerMonth = successfulOrdersPerMonthResult.recordset;

    // Query total canceled orders per month within the specified month-year range
    const canceledOrdersPerMonthResult = await pool
      .request()
      .input("startDateString", sql.DateTime, startDateString)
      .input("endDateString", sql.DateTime, endDateString).query(`
        SELECT 
          YEAR(order_date) AS year, 
          MONTH(order_date) AS month, 
          COUNT(*) AS canceledOrders 
        FROM Orders 
        WHERE order_date >= @startDateString AND order_date < @endDateString
        AND status IN ('Cancelled')
        GROUP BY YEAR(order_date), MONTH(order_date)
        ORDER BY year, month;
      `);
    const canceledOrdersPerMonth = canceledOrdersPerMonthResult.recordset;

    // Query total revenue per month within the specified month-year range
    const totalRevenuePerMonthResult = await pool
      .request()
      .input("startDateString", sql.DateTime, startDateString)
      .input("endDateString", sql.DateTime, endDateString).query(`
        SELECT 
          YEAR(order_date) AS year, 
          MONTH(order_date) AS month, 
          SUM(total_amount) AS totalRevenue 
        FROM Orders 
        WHERE order_date >= @startDateString AND order_date < @endDateString
        AND status IN ('Paid', 'Delivered', 'Completed', 'Confirmed')
        GROUP BY YEAR(order_date), MONTH(order_date)
        ORDER BY year, month;
      `);
    const totalRevenuePerMonth = totalRevenuePerMonthResult.recordset;

    return {
      totalOrders,
      totalRevenue,
      topProducts,
      successfulOrdersPerMonth,
      canceledOrdersPerMonth,
      totalRevenuePerMonth,
    };
  } catch (error) {
    console.error("Error getting dashboard data:", error);
    return {
      totalOrders: 0,
      totalRevenue: 0,
      topProducts: [],
      successfulOrdersPerMonth: [],
      canceledOrdersPerMonth: [],
      totalRevenuePerMonth: [],
      error: error.message,
    };
  }
}

module.exports = {
  createUser,
  getUserById,
  getAllUser,
  DeleteUser,
  updateUser,
  dashboard,
};
