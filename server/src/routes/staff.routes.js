const express = require("express");
const staffRouters = express.Router();
const { createVoucherController, editVoucherController } = require("../controller/staff.controller");
const { createVoucherMiddleware, editVoucherMiddleware } = require("../middlewares/staff.middleware");


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

//Edit Voucher
staffRouters.put("/editVoucher/:id", editVoucherMiddleware, editVoucherController);


module.exports = staffRouters;
