const {
  createVoucher,
  getAllUser,
  getAllProduct,
  getAllOrder,
  editVoucher,
} = require("../services/staff.services");

const createVoucherController = async (req, res) => {
  const { discount, expiration_date } = req.body;
  console.log(req.body);
  try {
    const result = await createVoucher(discount, expiration_date);
    console.log(result);
    if (result.success) {
      return res.status(200).json({
        message: result.message,
        status: 200,
      });
    }
  } catch (error) {
    console.log("fail to create a voucher");
  }
};

const getAllUserController = async (req, res) => {
  try {
    const result = await getAllUser();

    if (result.success) {
      return res.status(200).json({ user: result.user });
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get all user", error);
    res.status(500).json({ message: "Error getting all user" });
  }
};

const getAllProductController = async (req, res) => {
  try {
    const result = await getAllProduct();

    if (result.success) {
      return res.status(200).json({ user: result.product });
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get all user", error);
    res.status(500).json({ message: "Error getting all user" });
  }
};

const getOrderController = async (req, res) => {
  try {
    const result = await getAllOrder();
    if (result.success) {
      res.json(result.order);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Faill to get Order");
  }
};

const editVoucherController = async (req, res) => {
  const voucher_id = parseInt(req.params.id, 10);
  const { discount, expiration_date } = req.body;
  console.log(`Request to update voucher: id=${voucher_id}, discount=${discount}, expiration_date=${expiration_date}`);
  
  try {
    const result = await editVoucher(voucher_id, discount, expiration_date);
    console.log("Update result:", result);

    if (result.success) {
      res.status(200).json({ message: result.message, status: 200 });
    } else {
      res.status(409).json({ message: result.message, status: 409 });
    }
  } catch (error) {
    console.error("Error in editVoucherController:", error);  // Improved logging
    res.status(500).json({ message: "Error updating voucher", error: error.message });
  }
};



module.exports = {
  createVoucherController,
  getAllUserController,
  getAllProductController,
  getOrderController,
  editVoucherController,
};
