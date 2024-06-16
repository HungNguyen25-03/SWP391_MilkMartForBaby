const express = require("express");
const userController = require("../controller/users.controller");
const userMiddleware = require("../middlewares/users.middlewares");
const authJwt = require("../middlewares/authJwt.middlewares");
const userRoutes = express.Router();

userRoutes.post("/login", userController.loginUserController);

userRoutes.post(
  "/register",
  userMiddleware.registerUserMiddleware,
  userController.registerUserController
);

userRoutes.post(
  "/apply-voucher",
  authJwt.authenticateToken,
  userMiddleware.applyVoucherMiddleware,
  userController.applyVoucherController
);

userRoutes.get(
  "/show-all-voucher",
  userController.showAllVoucherController
);

userRoutes.get(
  "/show-voucher-by-user/:id",
  authJwt.authenticateToken,
  userController.showVoucherByUserIdController
);

userRoutes.post(
  "/claim-voucher",
  authJwt.authenticateToken,
  userMiddleware.claimVoucherMiddleware,
  userController.claimVoucherController
);

userRoutes.post("/refresh-token", userController.refreshTokenController);

userRoutes.post("/logout", userController.logoutController);

module.exports = userRoutes;
