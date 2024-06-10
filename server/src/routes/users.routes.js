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
const { authenticateToken } = require("../middlewares/authJwt.middlewares");
const userRoutes = express.Router();

userRoutes.post("/login", loginUserController);

userRoutes.post("/register", registerUserMiddleware, registerUserController);

userRoutes.post(
  "/apply-voucher",
  authenticateToken,
  applyVoucherMiddleware,
  applyVoucherController
);

userRoutes.get(
  "/show-all-voucher",
  authenticateToken,
  showAllVoucherController
);

userRoutes.get(
  "/show-voucher-by-user/:id",
  authenticateToken,
  showVoucherByUserIdController
);

userRoutes.post(
  "/claim-voucher",
  authenticateToken,
  claimVoucherMiddleware,
  claimVoucherController
);

module.exports = userRoutes;
