const express = require("express");
const productRouters = express.Router();
const { getProduct } = require("../controller/products.controller");

productRouters.get("/getProduct", getProduct);

module.exports = productRouters;
