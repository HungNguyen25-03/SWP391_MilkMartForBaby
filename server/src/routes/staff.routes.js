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
  createPostController,
  updatePostController,
  deletePostController,
  showAllReportController,
  addProductDetailsController,
  showProductDetailsController,
  deleteExpiredProductController,
} = require("../controller/staff.controller");
const {
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
} = require("../middlewares/staff.middleware");
const { authenticateToken } = require("../middlewares/authJwt.middlewares");

const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

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

staffRouters.get(
  "/show-product-details/:id",
  authenticateToken,
  showProductDetailsController
);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage });

staffRouters.post(
  "/uploads",
  upload.single("uploads"),
  function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    // console.log(JSON.stringify(req.file))
    res.json({ url: req.file.path });
  }
);

staffRouters.put(
  "/update-post/:id",
  authenticateToken,
  updatePostMiddlewares,
  updatePostController
);

staffRouters.post(
  "/create-post",
  authenticateToken,
  createPostMiddlewares,
  createPostController
);

staffRouters.delete(
  "/delete-post/:id",
  authenticateToken,
  deletePostController
);

staffRouters.delete(
  "/delete-expired-product",
  authenticateToken,
  deleteExpiredProductController
);

staffRouters.get(
  "/show-all-report",
  authenticateToken,
  showAllReportController
);

staffRouters.put(
  "/add-product-details/:id",
  authenticateToken,
  addProductDetailsMiddlewares,
  addProductDetailsController
);

module.exports = staffRouters;
