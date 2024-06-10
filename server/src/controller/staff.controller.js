const {createVoucher,getAllUser, getAllProduct,getAllOrder,getAllVoucher,importProduct} = require('../services/staff.services');

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
    };
};

const getAllUserController = async (req, res) => {
  try {
    const result = await getAllUser();
    if (result.success) {
      res.json(result.user);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Faill to get User");
  };
  };
  
  const getAllProductController = async (req, res) => {
    try {
      const result = await getAllProduct();
      if (result.success) {
        res.json(result.product);
      } else {
        res.json({ message: result.message });
      }
    } catch (error) {
      console.log("Faill to get Product");
    };
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
    };
  };





const getVoucherController = async (req,res) => {
  
  try {
    const result = await getAllVoucher();
    console.log(result);
    if (result.success) {
      res.json(result.vouchers);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Faill to get Voucher");
  };
};



const getImportProductController = async(req,res) => {
    const newProduct=req.body;
    if (!Array.isArray(newProduct)) {
      return res.status(400).json({ message: 'Invalid input. Expected an array of products.' });
    }
  try {
    const result=await importProduct(newProduct);
     if(result.success){
      res.json(result.message);
     }else{
      res.json({ message: result.message });
     }

  } catch (error) {
    console.log("Fail to import Product");
    
  };
};




module.exports = {
    createVoucherController,
    getAllUserController,
    getAllProductController,
    getOrderController,
    getVoucherController,
    getImportProductController
}