const { poolPromise, sql } = require("../services/database.services");

const createVoucherMiddleware = async (req, res, next) => {
  try {
    const errors = [];
    const { discount, expiration_date } = req.body;
    const pool = await poolPromise;
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

    const checkExpDateAndDiscount = await pool
      .request()
      .input("discount", sql.Decimal(5, 2), discount)
      .input("expiration_date", sql.Date, expiration_date)
      .query(
        `SELECT discount, expiration_date FROM Vouchers WHERE discount = @discount AND expiration_date = @expiration_date`
      );

    if (checkExpDateAndDiscount.recordset.length > 0) {
      errors.push({
        name: "voucher",
        success: false,
        message:
          "There is already a voucher with this discount and this expiration date",
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
      statusCheckResult.recordset[0].status === "Cancelled"
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
      expiration_date,
      production_date,
    } = req.body;

    if (!product_name) {
      errors.push({
        name: "product_name",
        success: false,
        message: "Product name is required",
        status: 400,
      });
    }

    if (!production_date) {
      errors.push({
        name: "production_date",
        success: false,
        message: "Production date is required",
        status: 400,
      });
    }

    if (!expiration_date) {
      errors.push({
        name: "expiration_date",
        success: false,
        message: "Expiration date is required",
        status: 400,
      });
    }

    const productNameCheck = await pool
      .request()
      .input("product_name", sql.NVarChar, product_name).query(`
      SELECT product_name FROM Products WHERE product_name = @product_name AND status = 1;`);

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

    const currentDate = new Date();
    if (expiration_date && new Date(expiration_date) < currentDate) {
      errors.push({
        name: "expiration_date",
        success: false,
        message: "Expiration date cannot be in the past",
        status: 400,
      });
    }

    if (production_date && new Date(production_date) > currentDate) {
      errors.push({
        name: "production_date",
        success: false,
        message: "Production date cannot be in the future",
        status: 400,
      });
    }

    if (expiration_date) {
      const expirationDateObj = new Date(expiration_date);

      if (
        expirationDateObj.getFullYear() === currentDate.getFullYear() &&
        expirationDateObj.getMonth() === currentDate.getMonth()
      ) {
        errors.push({
          name: "expiration_date",
          success: false,
          message: "Expiration date cannot be within the current month",
          status: 400,
        });
      }
    }

    if (
      production_date &&
      expiration_date &&
      new Date(production_date) > new Date(expiration_date)
    ) {
      errors.push({
        name: "date_mismatch",
        success: false,
        message: "Production date cannot be later than expiration date",
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

const addProductDetailsMiddlewares = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const { production_date, expiration_date, quantity } = req.body;
    const errors = [];
    const pool = await poolPromise;
    const currentDate = new Date();

    if (!production_date) {
      errors.push({
        name: "production_date",
        success: false,
        message: "Production date is required",
        status: 400,
      });
    }

    if (!expiration_date) {
      errors.push({
        name: "expiration_date",
        success: false,
        message: "Expiration date is required",
        status: 400,
      });
    }

    if (!quantity) {
      errors.push({
        name: "quantity",
        success: false,
        message: "Quantity is required",
        status: 400,
      });
    }

    if (quantity < 0) {
      errors.push({
        name: "quantity",
        success: false,
        message: "Quantity must be more than 0",
        status: 400,
      });
    }

    if (expiration_date) {
      const expirationDateObj = new Date(expiration_date);

      if (expirationDateObj < currentDate) {
        errors.push({
          name: "expiration_date",
          success: false,
          message: "Expiration date cannot be in the past",
          status: 400,
        });
      }

      if (
        expirationDateObj.getFullYear() === currentDate.getFullYear() &&
        expirationDateObj.getMonth() === currentDate.getMonth()
      ) {
        errors.push({
          name: "expiration_date",
          success: false,
          message: "Expiration date cannot be within the current month",
          status: 400,
        });
      }
    }

    if (production_date && new Date(production_date) > currentDate) {
      errors.push({
        name: "production_date",
        success: false,
        message: "Production date cannot be in the future",
        status: 400,
      });
    }

    if (
      production_date &&
      expiration_date &&
      new Date(production_date) > new Date(expiration_date)
    ) {
      errors.push({
        name: "date_mismatch",
        success: false,
        message: "Production date cannot be later than expiration date",
        status: 400,
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const updateProductMiddlewares = async (req, res, next) => {
  try {
    const errors = [];
    const pool = await poolPromise;
    const product_id = parseInt(req.params.id, 10);
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
      SELECT * FROM Products WHERE product_name = @product_name AND product_id != @product_id AND status = 1`);

      if (
        productCheckquery.recordset &&
        productCheckquery.recordset.length > 0
      ) {
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
    }

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    next();
  } catch (error) {
    console.error("Middleware error:", error);
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
      SELECT * FROM Products WHERE product_id = @product_id AND status = 1`);

    if (productCheckquery.recordset.length === 0) {
      errors.push({
        name: "product_id",
        success: false,
        message: "Product not found",
        status: 404,
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

const updatePostMiddlewares = async (req, res, next) => {
  try {
    const errors = [];
    const pool = await poolPromise;
    const post_id = req.params.id;
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

    if (image_url && !httpRegex.test(image_url)) {
      errors.push({
        name: "image_url",
        success: false,
        message: "Invalid image URL",
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
  addProductDetailsMiddlewares,
  updatePostMiddlewares,
};
