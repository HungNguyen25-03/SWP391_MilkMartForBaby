const express = require("express");
const { registerUserController, loginUserController } = require("../controller/users.controller");
const { registerUserMiddleware } = require("../middlewares/users.middlewares");
const userRoutes = express.Router();

userRoutes.post("/login",loginUserController);

userRoutes.post("/register", registerUserMiddleware, registerUserController);

module.exports = userRoutes;
