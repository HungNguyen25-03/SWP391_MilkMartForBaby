const express = require("express");

const payment = require("../controller/payment.controller");
const authJwt = require("../middlewares/authJwt.middlewares");

const paymentRoutes = express.Router();

// payment api
paymentRoutes.post("/zaloPay", payment.paymentController);

paymentRoutes.post("/callback", payment.callbackURLController);

module.exports = paymentRoutes;
