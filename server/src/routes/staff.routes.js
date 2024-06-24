const express = require("express");
const staffRouters = express.Router();
const {
  createVoucherController,
  editVoucherController,
} = require("../controller/staff.controller");
const {
  createVoucherMiddleware,
  editVoucherMiddleware,
  confirmOrderMiddleware,
  cancelOrderMiddleware,
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
const { getAllUserController } = require("../controller/staff.controller");
staffRouters.get("/user", authenticateToken, getAllUserController);

// Get Product Information by Staff
const { getAllProductController } = require("../controller/staff.controller");
staffRouters.get("/product", authenticateToken, getAllProductController);

//Get Order information by staff
const { getOrderController } = require("../controller/staff.controller");
staffRouters.get("/order", authenticateToken, getOrderController);

//Get Voucher information by staff
const { getVoucherController } = require("../controller/staff.controller");
staffRouters.get("/voucher", authenticateToken, getVoucherController);

// Import and export product by staff
const {
  getImportProductController,
} = require("../controller/staff.controller");
staffRouters.post("/import", authenticateToken, getImportProductController);

//Edit Voucher
staffRouters.put(
  "/editVoucher/:id",
  authenticateToken,
  editVoucherMiddleware,
  editVoucherController
);

// Export Product
const { exportProductController } = require("../controller/staff.controller");
staffRouters.get("/export/:id", authenticateToken, exportProductController);

// Edit quantity Product
const { editProductController } = require("../controller/staff.controller");
staffRouters.post("/edit", authenticateToken, editProductController);

// Confirm Order
const { confirmOrderController } = require("../controller/staff.controller");
staffRouters.put(
  "/confirm",
  authenticateToken,
  confirmOrderMiddleware,
  confirmOrderController
);

// Cancel Order
const { cancelOrderController } = require("../controller/staff.controller");
staffRouters.put(
  "/cancel",
  authenticateToken,
  cancelOrderMiddleware,
  cancelOrderController
);

module.exports = staffRouters;
