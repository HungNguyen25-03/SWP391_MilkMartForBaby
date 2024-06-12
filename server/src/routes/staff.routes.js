const express = require("express");
const staffRouters = express.Router();
const { createVoucherController, editVoucherController } = require("../controller/staff.controller");
const { createVoucherMiddleware, editVoucherMiddleware } = require("../middlewares/staff.middleware");
const {authenticateToken} = require("../middlewares/authJwt.middlewares");

// Create Voucher 
staffRouters.post("/createVoucher", createVoucherMiddleware, createVoucherController);


//Get User Information by staff
const{getAllUserController}=require("../controller/staff.controller");
staffRouters.get("/user",getAllUserController);

// Get Product Information by Staff
const {getAllProductController}=require("../controller/staff.controller");
staffRouters.get("/product",getAllProductController);


//Get Order information by staff
const{getOrderController}=require("../controller/staff.controller");
staffRouters.get("/order",getOrderController);


//Get Voucher information by staff
const{getVoucherController}=require("../controller/staff.controller");
staffRouters.get("/voucher",getVoucherController);

// Import and export product by staff
const{getImportProductController}=require("../controller/staff.controller");
staffRouters.post("/import",getImportProductController);

//Edit Voucher
staffRouters.put("/editVoucher/:id", editVoucherMiddleware, editVoucherController);


// Export Product
const{exportProductController}=require("../controller/staff.controller");
staffRouters.get("/export/:id",exportProductController);


// Edit quantity Product
const{editProductController}=require("../controller/staff.controller");
staffRouters.post("/edit",editProductController);


module.exports = staffRouters;
