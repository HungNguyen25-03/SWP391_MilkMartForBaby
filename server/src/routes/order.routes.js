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


//Confirmed


//Delivered


// Cancelled


module.exports = orderRouters;