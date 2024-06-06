const express = require("express");
const orderRouters = express.Router();


//get All Order api
const{getOrder}=require("../controller/orders.controller");
orderRouters.get("/getOrder",getOrder);



module.exports = orderRouters;