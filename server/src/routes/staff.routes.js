const express = require("express");
const staffRouters = express.Router();


const { createVoucherController } = require("../controller/staff.controller");
const { createVoucherMiddleware } = require("../middlewares/staff.middleware");


// staff crrate voucher
staffRouters.post("/createVoucher", createVoucherMiddleware, createVoucherController);


// Get Order information
const {getOrder}=require("../controller/orders.controller")
staffRouters.get("/order",getOrder);


//Get Product Information

const {getProduct}=require("../controller/products.controller")
staffRouters.get("/product",getProduct);


//Get User Information
staffRouters.get("");

module.exports = staffRouters;
