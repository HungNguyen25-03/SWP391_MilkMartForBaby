const {
  getAllOrder,
  getOrderById,
  getCompleteStatus,
  getPendingStatus,
  getConfirmStatus,
  getDeliverStatus,
  getOrderByUserId,
  getOrderByUserIdConfirmStatus,
  getOrderByUserIdPaidStatus,
  getOrderByUserIdDeliveredStatus,
  getOrderByUserIdPendingStatus,
  getOrderByUserIdCancelledStatus,
} = require("../services/order.services");

const getOrder = async (req, res) => {
  try {
    const result = await getAllOrder();
    if (result.success) {
      res.json(result.order);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Order");
  }
};

const getOrderId = async (req, res) => {
  try {
    const result = await getOrderById();
    if (result.success) {
      res.json(result.order);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Order by ID");
  }
};

const getOrderByCompleteStatus = async (req, res) => {
  try {
    const result = await getCompleteStatus();
    if (result.success) {
      res.json(result.order);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Orders by Complete Status");
  }
};

const getOrderByPendingStatus = async (req, res) => {
  try {
    const result = await getPendingStatus();
    if (result.success) {
      res.json(result.order);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Orders by Pending Status");
  }
};

const getOrderByConfirmStatus = async (req, res) => {
  try {
    const result = await getConfirmStatus();
    if (result.success) {
      res.json(result.order);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Orders by Confirm Status");
  }
};

const getOrderByDeliveredStatus = async (req, res) => {
  try {
    const result = await getDeliverStatus();
    if (result.success) {
      res.json(result.order);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Orders by Delivered Status");
  }
};

const getOrderByUserIdController = async (req, res) => {
  try {
    const { user_id } = req.body;
    const result = await getOrderByUserId(user_id);
    if (result.success) {
      res.json(result.orders);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Orders by User ID");
  }
};

const getOrderByUserIdConfirmStatusController = async (req, res) => {
  try {
    const { user_id } = req.body;
    const result = await getOrderByUserIdConfirmStatus(user_id);
    if (result.success) {
      res.json(result.orders);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Orders by User ID Confirm Status");
  }
};

const getOrderByUserIdPaidStatusController = async (req, res) => {
  try {
    const { user_id } = req.body;
    const result = await getOrderByUserIdPaidStatus(user_id);
    if (result.success) {
      res.json(result.orders);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Orders by User ID Paid Status");
  }
};

const getOrderByUserIdDeliveredStatusController = async (req, res) => {
  try {
    const { user_id } = req.body;
    const result = await getOrderByUserIdDeliveredStatus(user_id);
    if (result.success) {
      res.json(result.orders);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Orders by User ID Delivered Status");
  }
};

const getOrderByUserIdPendingStatusController = async (req, res) => {
  try {
    const { user_id } = req.body;
    const result = await getOrderByUserIdPendingStatus(user_id);
    if (result.success) {
      res.json(result.orders);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Orders by User ID Pending Status");
  }
};

const getOrderByUserIdCancelledStatusController = async (req, res) => {
  try {
    const { user_id } = req.body;
    const result = await getOrderByUserIdCancelledStatus(user_id);
    if (result.success) {
      res.json(result.orders);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Orders by User ID Cancelled Status");
  }
};

module.exports = {
  getOrder,
  getOrderId,
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
};
