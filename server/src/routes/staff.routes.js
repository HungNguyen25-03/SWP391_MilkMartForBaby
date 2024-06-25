const express = require("express");
const staffRouters = express.Router();
const {
  createVoucherController,
  editVoucherController,
  getAllUserController,
  getAllProductController,
  getOrderController,
  getVoucherController,
  getImportProductController,
  exportProductController,
  editProductController,
  confirmOrderController,
  cancelOrderController,
  addProductController,
  updateProductController,
} = require("../controller/staff.controller");
const {
  createVoucherMiddleware,
  editVoucherMiddleware,
  confirmOrderMiddleware,
  cancelOrderMiddleware,
  addProductMiddlewares,
  updateProductMiddlewares,
  deleteProductMiddlewares,
} = require("../middlewares/staff.middleware");
const { authenticateToken } = require("../middlewares/authJwt.middlewares");

// Create Voucher
staffRouters.post(
  "/createVoucher",
  authenticateToken,
  createVoucherMiddleware,
  createVoucherController
);

//Get User Information by staff
staffRouters.get("/user", authenticateToken, getAllUserController);

// Get Product Information by Staff
staffRouters.get("/product", authenticateToken, getAllProductController);

//Get Order information by staff
staffRouters.get("/order", authenticateToken, getOrderController);

//Get Voucher information by staff
staffRouters.get("/voucher", authenticateToken, getVoucherController);

// Import and export product by staff
staffRouters.post("/import", authenticateToken, getImportProductController);

//Edit Voucher
staffRouters.put(
  "/editVoucher/:id",
  authenticateToken,
  editVoucherMiddleware,
  editVoucherController
);

// Export Product
staffRouters.get(
  "/export/:id",
  authenticateToken,
  deleteProductMiddlewares,
  exportProductController
);

// Edit quantity Product
staffRouters.post("/edit", authenticateToken, editProductController);

// Confirm Order
staffRouters.put(
  "/confirm",
  authenticateToken,
  confirmOrderMiddleware,
  confirmOrderController
);

// Cancel Order
staffRouters.put(
  "/cancel",
  authenticateToken,
  cancelOrderMiddleware,
  cancelOrderController
);

staffRouters.post(
  "/add-product",
  authenticateToken,
  addProductMiddlewares,
  addProductController
);

staffRouters.put(
  "/update-product/:id",
  authenticateToken,
  updateProductMiddlewares,
  updateProductController
);

module.exports = staffRouters;
