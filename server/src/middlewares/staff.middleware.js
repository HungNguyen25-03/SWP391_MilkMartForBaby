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

const addProductMiddlewares = async (req, res, next) => {
  try {
    const errors = [];
    const pool = await poolPromise;
    const {
      product_name,
      description,
      price,
      stock,
      brand_id,
      country_id,
      age_range,
      image_url,
    } = req.body;

    if (!product_name) {
      errors.push({
        name: "product_name",
        success: false,
        message: "Product name is required",
        status: 400,
      });
    }

    const productNameCheck = await pool
      .request()
      .input("product_name", sql.NVarChar, product_name).query(`
      SELECT product_name FROM Products WHERE product_name = @product_name;`);

    if (productNameCheck.recordset.length > 0) {
      errors.push({
        name: "product_name",
        success: false,
        message: "Product name already exists",
        status: 400,
      });
    }

    if (!price) {
      errors.push({
        name: "price",
        success: false,
        message: "Price is required",
        status: 400,
      });
    }

    if (price < 100) {
      errors.push({
        name: "price",
        success: false,
        message: "Price must be more than 100",
        status: 400,
      });
    }

    if (!stock) {
      errors.push({
        name: "stock",
        success: false,
        message: "Stock is required",
        status: 400,
      });
    }

    if (stock < 0) {
      errors.push({
        name: "stock",
        success: false,
        message: "Stock must be more than 1",
        status: 400,
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  } catch (error) {
    console.error("Error in addProductMiddlewares:", error);
    next(error);
  }
};

const updateProductMiddlewares = async (req, res, next) => {
  try {
    const errors = [];
    const pool = await poolPromise;
    const product_id = req.params.id;
    const {
      product_name,
      description,
      price,
      stock,
      brand_id,
      country_id,
      age_range,
      image_url,
    } = req.body;

    if (!product_name) {
      errors.push({
        name: "product_name",
        message: "Product name is required",
        status: 400,
      });
    }

    if (!price) {
      errors.push({
        name: "price",
        message: "Price is required",
        status: 400,
      });
    }

    if (price < 100) {
      errors.push({
        name: "price",
        success: false,
        message: "Price must be more than 100",
        status: 400,
      });
    }

    if (!stock) {
      errors.push({
        name: "stock",
        message: "Stock is required",
        status: 400,
      });
    }

    if (stock < 0) {
      errors.push({
        name: "stock",
        success: false,
        message: "Stock must be more than 1",
        status: 400,
      });
    }

    let productCheckquery;
    if (product_name) {
      productCheckquery = await pool
        .request()
        .input("product_name", sql.NVarChar, product_name)
        .input("product_id", sql.Int, product_id).query(`
      SELECT * FROM Products WHERE product_name = @product_name AND product_id != @product_id`);
    }
    console.log(productCheckquery.recordset);
    if (productCheckquery.recordset.length > 0) {
      const existingProductName = productCheckquery.recordset[0].product_name;
      if (existingProductName === product_name) {
        errors.push({
          name: "product_name",
          success: false,
          message: "Product name already exists",
          status: 400,
        });
      }
    }

    if (errors.length > 0) {
      return next(errors);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const deleteProductMiddlewares = async (req, res, next) => {
  try {
    const errors = [];
    const pool = await poolPromise;
    const product_id = req.params.id;

    const productCheckquery = await pool
      .request()
      .input("product_id", sql.Int, product_id).query(`
      SELECT * FROM Products WHERE product_id = @product_id`);

    if (productCheckquery.recordset.length === 0) {
      errors.push({
        name: "product_id",
        success: false,
        message: "Product not found",
        status: 404,
      });
    }

    if (productCheckquery.recordset[0].stock > 0) {
      errors.push({
        name: "product_id",
        success: false,
        message: "Product stock must be 0 to delete",
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

const createPostMiddlewares = async (req, res, next) => {
  try {
    const errors = [];
    const { title, description, image_url, user_id } = req.body;
    const httpRegex = /^(http|https):\/\//;

    if (!title) {
      errors.push({
        name: "title",
        success: false,
        message: "Title is required",
        status: 400,
      });
    }

    if (!description) {
      errors.push({
        name: "content",
        success: false,
        message: "Description is required",
        status: 400,
      });
    }

    if (!user_id) {
      errors.push({
        name: "user_id",
        success: false,
        message: "User ID is required",
        status: 400,
      });
    }

    if (image_url && !httpRegex.test(image_url)) {
      errors.push({
        name: "image_url",
        success: false,
        message: "Invalid image URL",
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

module.exports = {
  createVoucherMiddleware,
  editVoucherMiddleware,
  confirmOrderMiddleware,
  cancelOrderMiddleware,
  addProductMiddlewares,
  updateProductMiddlewares,
  deleteProductMiddlewares,
  createPostMiddlewares,
};
