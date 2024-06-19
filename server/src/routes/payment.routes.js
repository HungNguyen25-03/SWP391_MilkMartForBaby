const express = require("express");

const payment = require("../controller/payment.controller");
const authJwt = require("../middlewares/authJwt.middlewares");

const paymentRoutes = express.Router();

// payment api
paymentRoutes.post(
  "/zaloPay",
  authJwt.authenticateToken,
  payment.paymentController
);

paymentRoutes.post(
  "/callback",
  payment.callbackURLController
);

paymentRoutes.post(
  "/order-status/:id",
  authJwt.authenticateToken,
  payment.orderStatusController
);

paymentRoutes.get(
  "/payment-methods",
  authJwt.authenticateToken,
  payment.getAllPaymentMethodsController
);

module.exports = paymentRoutes;
