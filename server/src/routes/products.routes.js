const express = require("express");
const productRouters = express.Router();

// get all the controllers at once
const {
  getProduct,
  getProById,
  searchByName,
  filtering,
  getAllProductWithoutPaginationController,
  getAllCategoryController,
  getAvgRatingByProductIdController,
  getProductByBrandName,
} = require("../controller/products.controller");

// Define the routes with their corresponding controller functions
productRouters.get("/getProduct", getProduct);
productRouters.get("/getProById/:id", getProById);
productRouters.get("/search", searchByName);
productRouters.post("/filter", filtering);
productRouters.get(
  "/getAllProductWithoutPagination",
  getAllProductWithoutPaginationController
);
productRouters.get("/get-all-category", getAllCategoryController);
productRouters.get("/get-avg-rating/:id", getAvgRatingByProductIdController);
productRouters.get("/getProductBrand", getProductByBrandName);

module.exports = productRouters;
