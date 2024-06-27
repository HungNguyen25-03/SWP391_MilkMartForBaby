const express = require("express");

const {
  createUserController,
  updateUserController,
  deleteUserController,
  getAllUserController,
  getUserByIdController,
  dashboardController,
} = require("../controller/admins.controller");

const {
  createUserMiddleware,
  updateUserMiddleware,
} = require("../middlewares/admin.middlewares");
const authJwt = require("../middlewares/authJwt.middlewares");
const adminRoutes = express.Router();

// admin CRUD api

//api create User
adminRoutes.post("/create", createUserMiddleware, createUserController);

//api get User
adminRoutes.get(
  "/getUser/:id",
  authJwt.authenticateToken,
  getUserByIdController
);

// get All User
adminRoutes.get("/allUsers", authJwt.authenticateToken, getAllUserController);

// Delete user

adminRoutes.get("/delete/:id", authJwt.authenticateToken, deleteUserController);

//api update User
adminRoutes.put(
  "/update/:id",
  authJwt.authenticateToken,
  updateUserMiddleware,
  updateUserController
);

//api dashboard
adminRoutes.post("/dashboard", authJwt.authenticateToken, dashboardController);

module.exports = adminRoutes;
