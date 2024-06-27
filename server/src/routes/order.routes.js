const express = require("express");
const orderRouters = express.Router();

const {
  getOrder,
  getOrderByCompleteStatus,
  getOrderByPendingStatus,
  getOrderByConfirmStatus,
  getOrderByDeliveredStatus,
  getOrderByUserIdController,
  getOrderByUserIdConfirmStatusController,
  getOrderByUserIdPaidStatusController,
  getOrderByUserIdDeliveredStatusController,
  getOrderByUserIdPendingStatusController,
  getOrderByUserIdCancelledStatusController,
} = require("../controller/orders.controller");

orderRouters.get("/getOrder", getOrder);
orderRouters.get("/CompleteOrder", getOrderByCompleteStatus);
orderRouters.get("/PendingOrder", getOrderByPendingStatus);
orderRouters.get("/ConfirmOrder", getOrderByConfirmStatus);
orderRouters.get("/DeliveredOrder", getOrderByDeliveredStatus);
orderRouters.post("/get-order-by-user-id", getOrderByUserIdController);
orderRouters.post(
  "/get-order-by-user-id-confirm-status",
  getOrderByUserIdConfirmStatusController
);
orderRouters.post(
  "/get-order-by-user-id-paid-status",
  getOrderByUserIdPaidStatusController
);
orderRouters.post(
  "/get-order-by-user-id-delivered-status",
  getOrderByUserIdDeliveredStatusController
);
orderRouters.post(
  "/get-order-by-user-id-pending-status",
  getOrderByUserIdPendingStatusController
);
orderRouters.post(
  "/get-order-by-user-id-cancelled-status",
  getOrderByUserIdCancelledStatusController
);
module.exports = orderRouters;
