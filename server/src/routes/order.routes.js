const express = require("express");
const orderRouters = express.Router();


//get All Order api
const{getOrder}=require("../controller/orders.controller");
orderRouters.get("/getOrder",getOrder);

// Get Order By status :


// Completed

const{getOrderByCompleteStatus}=require("../controller/orders.controller");
orderRouters.get("/CompleteOrder",getOrderByCompleteStatus);


//Pending
const{getOrderByPendingStatus}=require("../controller/orders.controller");
orderRouters.get("/PendingOrder",getOrderByPendingStatus);


//Confirmed
const {getOrderByConfirmStatus}=require("../controller/orders.controller");
orderRouters.get("/ConfirmOrder",getOrderByConfirmStatus);

//Delivered
const {getOrderByDeliveredStatus}=require("../controller/orders.controller");
orderRouters.get("/DeliveredOrder",getOrderByDeliveredStatus);

// Cancelled


module.exports = orderRouters;