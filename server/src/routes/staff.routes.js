const express = require("express");
const staffRouters = express.Router();
const { createVoucherController } = require("../controller/staff.controller");
const { createVoucherMiddleware } = require("../middlewares/staff.middleware");


// Create Voucher 
staffRouters.post("/createVoucher", createVoucherMiddleware, createVoucherController);


//Get User Information
const{getAllUserController}=require("../controller/staff.controller");
staffRouters.get("/user",getAllUserController);

module.exports = staffRouters;
