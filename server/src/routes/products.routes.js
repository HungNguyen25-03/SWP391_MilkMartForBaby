const express = require("express");
const productRouters = express.Router();

// get All Product
const { getProduct } = require("../controller/products.controller");
productRouters.post("/getProduct", getProduct);

//get Product By ID
const { getProById } = require("../controller/products.controller");
productRouters.get("/getProById", getProById);

// search By name
const { searchByName } = require("../controller/products.controller");
productRouters.get("/search", searchByName);

//fliter Product
const { filtering } = require("../controller/products.controller");
productRouters.post("/filter", filtering);

module.exports = productRouters;
