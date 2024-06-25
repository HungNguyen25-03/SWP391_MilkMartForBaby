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

userRoutes.get("/show-all-voucher", userController.showAllVoucherController);

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

userRoutes.post(
  "/review-product",
  authJwt.authenticateToken,
  userMiddleware.reviewsByProductIdMiddlewares,
  userController.reviewsByProductIdController
);

userRoutes.post(
  "/ready-to-checkout",
  authJwt.authenticateToken,
  userController.readyToCheckoutController
);

userRoutes.post(
  "/refresh-token",
  authJwt.authenticateToken,
  userController.refreshTokenController
);

userRoutes.post(
  "/logout",
  authJwt.authenticateToken,
  userController.logoutController
);

userRoutes.get(
  "/show-reviews-by-product/:product_id",
  userController.showReviewsByProductIdController
);

module.exports = userRoutes;
