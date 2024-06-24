const { poolPromise, sql } = require("../services/database.services");

const createVoucherMiddleware = async (req, res, next) => {
  try {
    const errors = [];
    const { discount, expiration_date } = req.body;

    if (!discount) {
      errors.push({
        name: "discount",
        success: false,
        message: "Discount is required",
        status: 400,
      });
    }

    if (discount < 0 || discount > 75) {
      errors.push({
        name: "discount",
        success: false,
        message: "Discount must be between 0 and 75",
        status: 400,
      });
    }
    const checkDate = new Date(expiration_date);
    if (!checkDate) {
      errors.push({
        name: "expiration_date",
        success: false,
        message: "Voucher expiry date is required",
        status: 400,
      });
    }

    if (checkDate <= new Date()) {
      errors.push({
        name: "expiration_date",
        success: false,
        message: "Voucher expiry date must be in the future",
        status: 400,
      });
    }

    if (errors.length > 0) {
      return next(errors);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const editVoucherMiddleware = async (req, res, next) => {
  try {
    const errors = [];
    const { discount, expiration_date } = req.body;

    if (discount === undefined || discount === null) {
      errors.push({
        name: "discount",
        success: false,
        message: "Discount is required",
        status: 400,
      });
    } else if (discount < 0 || discount > 75) {
      errors.push({
        name: "discount",
        success: false,
        message: "Discount must be between 0 and 75",
        status: 400,
      });
    }

    if (!expiration_date) {
      errors.push({
        name: "expiration_date",
        success: false,
        message: "Voucher expiry date is required",
        status: 400,
      });
    } else {
      const checkDate = new Date(expiration_date);
      if (isNaN(checkDate.getTime())) {
        errors.push({
          name: "expiration_date",
          success: false,
          message: "Invalid expiration date format",
          status: 400,
        });
      } else if (checkDate <= new Date()) {
        errors.push({
          name: "expiration_date",
          success: false,
          message: "Voucher expiry date must be in the future",
          status: 400,
        });
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  } catch (error) {
    console.error("Error in editVoucherMiddleware:", error);
    next(error);
  }
};

const confirmOrderMiddleware = async (req, res, next) => {
  try {
    const errors = [];
    const { order_id } = req.body;

    if (!order_id) {
      errors.push({
        name: "order_id",
        success: false,
        message: "Order ID is required",
        status: 400,
      });
    }
    const pool = await poolPromise;
    const statusCheckResult = await pool
      .request()
      .input("order_id", sql.Int, order_id).query(`
        SELECT status FROM Orders WHERE order_id = @order_id;
      `);

    if (
      statusCheckResult.recordset.length > 0 &&
      statusCheckResult.recordset[0].status === "confirmed"
    ) {
      errors.push({
        name: "order_id",
        success: false,
        message: "Order is already confirmed",
        status: 400,
      });
    }

    const stockCheckResult = await pool
      .request()
      .input("order_id", sql.Int, order_id)
      .query(
        `SELECT COUNT(*) as count FROM Products p JOIN Order_Items oi 
        ON p.product_id = oi.product_id JOIN Orders o ON oi.order_id = o.order_id
        WHERE p.stock <= 0 AND o.order_id = @order_id;`
      );

    if (stockCheckResult.recordset[0].count > 0) {
      errors.push({
        name: "order_id",
        success: false,
        message:
          "Order cannot be confirmed, one or more products are out of stock",
        status: 400,
      });
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  } catch (error) {
    console.error("Error in confirmOrderMiddleware:", error);
    next(error);
  }
};

const cancelOrderMiddleware = async (req, res, next) => {
  try {
    const errors = [];
    const { order_id } = req.body;

    if (!order_id) {
      errors.push({
        name: "order_id",
        success: false,
        message: "Order ID is required",
        status: 400,
      });
    }

    const pool = await poolPromise;
    const statusCheckResult = await pool
      .request()
      .input("order_id", sql.Int, order_id).query(`
        SELECT status FROM Orders WHERE order_id = @order_id;
      `);

    if (
      statusCheckResult.recordset.length > 0 &&
      statusCheckResult.recordset[0].status === "cancel"
    ) {
      errors.push({
        name: "order_id",
        success: false,
        message: "Order is already cancelled",
        status: 400,
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  } catch (error) {
    console.error("Error in cancelOrderMiddleware:", error);
    next(error);
  }
};

module.exports = {
  createVoucherMiddleware,
  editVoucherMiddleware,
  confirmOrderMiddleware,
  cancelOrderMiddleware,
};
