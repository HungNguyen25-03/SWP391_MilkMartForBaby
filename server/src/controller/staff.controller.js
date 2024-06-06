const {createVoucher,getAllUser, getAllProduct} = require('../services/staff.services');

const createVoucherController = async (req, res) => {
    const {discount, expiration_date} = req.body;
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
}

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

 

module.exports = {
    createVoucherController,
    getAllUserController,
    getAllProductController
}