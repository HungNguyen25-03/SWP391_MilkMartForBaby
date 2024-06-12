const express = require("express");
const productRouters = express.Router();


// get All Product
const { getProduct } = require("../controller/products.controller");
productRouters.get("/getProduct", getProduct);

//get Product By ID
const{getProById}=require("../controller/products.controller");
productRouters.get("/getProById",getProById);


// search By name


//fliter Product


module.exports = productRouters;
