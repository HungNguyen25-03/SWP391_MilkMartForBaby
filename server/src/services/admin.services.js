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

    if (user != 0) {
      return { success: true, user };
    } else {
      return { success: false, message: "Fail to delete User" };
    }
  } catch (error) {
    throw error;
  }
}

async function updateUser(user_id, username, email, role_id) {
  try {
    const pool = await poolPromise;
    const request = pool.request().input("user_id", user_id);

    let updateFields = [];

    if (username) {
      request.input("username", username);
      updateFields.push("username = @username");
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

    // Convert input dates from dd-MM-yyyy to Date objects
    const [startDay, startMonth, startYear] = startDate.split("-").map(Number);
    const [endDay, endMonth, endYear] = endDate.split("-").map(Number);
    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);

    // Calculate duration in days
    const duration = (end - start) / (1000 * 60 * 60 * 24);
    const calculatePerDay = duration < 31;

    // Calculate the start and end date strings in the required format
    const startDateString = `${startYear}-${String(startMonth).padStart(
      2,
      "0"
    )}-${String(startDay).padStart(2, "0")}`;
    const endDateString = `${endYear}-${String(endMonth).padStart(
      2,
      "0"
    )}-${String(endDay).padStart(2, "0")}`;

    // Query total orders within the specified month-year range
    const totalOrdersResult = await pool
      .request()
      .input("startDateString", sql.DateTime, startDateString)
      .input("endDateString", sql.DateTime, endDateString).query(`
        SELECT COUNT(*) AS totalOrders 
        FROM Orders 
        WHERE order_date >= @startDateString AND order_date <= @endDateString
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
        WHERE order_date >= @startDateString AND order_date <= @endDateString
        AND status IN ('Paid', 'Delivered', 'Completed', 'Confirmed');
      `);
    const totalRevenue = totalRevenueResult.recordset[0].totalRevenue;

    // Query top 12 best-selling brands within the specified month-year range
    const topProductsResult = await pool
      .request()
      .input("startDateString", sql.DateTime, startDateString)
      .input("endDateString", sql.DateTime, endDateString).query(`
        SELECT TOP 12 b.brand_id, b.brand_name, SUM(oi.quantity) AS totalSold 
        FROM Order_Items oi 
        JOIN Products p ON oi.product_id = p.product_id 
        JOIN Orders o ON oi.order_id = o.order_id 
        JOIN Brands b ON p.brand_id = b.brand_id 
        WHERE o.order_date >= @startDateString AND o.order_date <= @endDateString
        AND o.status IN ('Paid', 'Delivered', 'Completed', 'Confirmed') 
        GROUP BY b.brand_id, b.brand_name
        ORDER BY totalSold DESC;
      `);
    const topProducts = topProductsResult.recordset;

    // Query total successful orders per month within the specified month-year range
    const successfulOrdersPerMonthResult = await pool
      .request()
      .input("startDateString", sql.DateTime, startDateString)
      .input("endDateString", sql.DateTime, endDateString).query(`
        SELECT 
          FORMAT(order_date, 'MM-yyyy') AS yearMonth, 
          COUNT(*) AS successfulOrders 
        FROM Orders 
        WHERE order_date >= @startDateString AND order_date <= @endDateString
        AND status IN ('Paid', 'Delivered', 'Completed', 'Confirmed')
        GROUP BY FORMAT(order_date, 'MM-yyyy')
        ORDER BY yearMonth;
      `);
    const successfulOrdersPerMonth = successfulOrdersPerMonthResult.recordset;

    // Query total canceled orders per month within the specified month-year range
    const canceledOrdersPerMonthResult = await pool
      .request()
      .input("startDateString", sql.DateTime, startDateString)
      .input("endDateString", sql.DateTime, endDateString).query(`
      SELECT COUNT(*) AS totalCancelledOrders 
      FROM Orders 
      WHERE order_date >= @startDateString AND order_date <= @endDateString
      AND status IN ('Cancelled');
      `);
    const canceledOrdersPerMonth =
      canceledOrdersPerMonthResult.recordset[0].totalCancelledOrders;

    // Query total revenue per day or per month within the specified month-year range
    const totalRevenuePerPeriodResult = await pool
      .request()
      .input("startDateString", sql.DateTime, startDateString)
      .input("endDateString", sql.DateTime, endDateString)
      .query(
        calculatePerDay
          ? `
        WITH DateSeries AS (
          SELECT 
            @startDateString AS dayStart
          UNION ALL
          SELECT 
            DATEADD(DAY, 1, dayStart)
          FROM 
            DateSeries
          WHERE 
            dayStart < @endDateString
        )
        SELECT 
          FORMAT(ds.dayStart, 'dd-MM-yyyy') AS periodMonth, 
          ISNULL(SUM(o.total_amount), 0) AS totalRevenue
        FROM 
          DateSeries ds
          LEFT JOIN Orders o ON CONVERT(date, o.order_date) = CONVERT(date, ds.dayStart)
          AND o.order_date >= @startDateString AND o.order_date <= @endDateString
          AND o.status IN ('Paid', 'Delivered', 'Completed', 'Confirmed')
        GROUP BY 
          FORMAT(ds.dayStart, 'dd-MM-yyyy')
        ORDER BY 
          FORMAT(ds.dayStart, 'dd-MM-yyyy')
        OPTION (MAXRECURSION 0);
      `
          : `
        WITH DateSeries AS (
          SELECT 
            DATEFROMPARTS(YEAR(@startDateString), MONTH(@startDateString), 1) AS monthStart
          UNION ALL
          SELECT 
            DATEADD(MONTH, 1, monthStart)
          FROM 
            DateSeries
          WHERE 
            monthStart < DATEFROMPARTS(YEAR(@endDateString), MONTH(@endDateString), 1)
        )
        SELECT 
          FORMAT(ds.monthStart, 'MM-yyyy') AS periodMonth, 
          ISNULL(SUM(o.total_amount), 0) AS totalRevenue
        FROM 
          DateSeries ds
          LEFT JOIN Orders o ON YEAR(o.order_date) = YEAR(ds.monthStart) AND MONTH(o.order_date) = MONTH(ds.monthStart)
          AND o.order_date >= @startDateString AND o.order_date <= @endDateString
          AND o.status IN ('Paid', 'Delivered', 'Completed', 'Confirmed')
        GROUP BY 
          FORMAT(ds.monthStart, 'MM-yyyy')
        ORDER BY 
          FORMAT(ds.monthStart, 'MM-yyyy')
        OPTION (MAXRECURSION 0);
      `
      );
    const totalRevenuePerPeriod = totalRevenuePerPeriodResult.recordset;

    return {
      totalOrders,
      totalRevenue,
      topProducts,
      successfulOrdersPerMonth,
      canceledOrdersPerMonth,
      totalRevenuePerPeriod,
    };
  } catch (error) {
    console.error("Error getting dashboard data:", error);
    return {
      totalOrders: 0,
      totalRevenue: 0,
      topProducts: [],
      successfulOrdersPerMonth: [],
      canceledOrdersPerMonth: [],
      totalRevenuePerPeriod: [],
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
