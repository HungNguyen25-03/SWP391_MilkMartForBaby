const express = require("express");
const staffRouters = express.Router();


const { createVoucherController } = require("../controller/staff.controller");
const { createVoucherMiddleware } = require("../middlewares/staff.middleware");


// staff crrate voucher
staffRouters.post("/createVoucher", createVoucherMiddleware, createVoucherController);


// Get Order information
const {getOrder}=require("../controller/orders.controller")
staffRouters.get("/order",getOrder);


module.exports = staffRouters;
