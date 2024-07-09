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

userRoutes.put(
  "/complete-order/:id",
  authJwt.authenticateToken,
  userMiddleware.completeOrderMiddlewares,
  userController.completeOrderController
);

userRoutes.post(
  "/report-product",
  authJwt.authenticateToken,
  userController.reportProductController
);
userRoutes.get("/get-post/:id", userController.getPostByIdController);

userRoutes.get("/show-all-posts", userController.showAllPostsController);

userRoutes.post(
  "/request-password-reset",
  userMiddleware.requestPasswordResetMiddleware,
  userController.requestPasswordResetController
);

userRoutes.post(
  "/reset-password",
  userMiddleware.resetPasswordMiddleware,
  userController.resetPasswordController
);

userRoutes.get(
  "/loyalty-points/:id",
  authJwt.authenticateToken,
  userController.showLoyaltyPointsController
);

module.exports = userRoutes;
