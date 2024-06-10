const express = require("express");
const {
  registerUserController,
  loginUserController,
  applyVoucherController,
  showAllVoucherController,
  showVoucherByUserIdController,
  claimVoucherController,
} = require("../controller/users.controller");
const {
  registerUserMiddleware,
  applyVoucherMiddleware,
  claimVoucherMiddleware,
} = require("../middlewares/users.middlewares");
const userRoutes = express.Router();

userRoutes.post("/login", loginUserController);

userRoutes.post("/register", registerUserMiddleware, registerUserController);

userRoutes.post("/apply-voucher", applyVoucherMiddleware, applyVoucherController);

userRoutes.get("/show-all-voucher", showAllVoucherController);

userRoutes.get("/show-voucher-by-user/:id", showVoucherByUserIdController);

userRoutes.post("/claim-voucher", claimVoucherMiddleware, claimVoucherController);



module.exports = userRoutes;
