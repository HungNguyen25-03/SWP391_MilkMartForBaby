const {createVoucher,getAllUser, getAllProduct,getAllOrder,getAllVoucher,importProduct, exportProduct,editProduct} = require('../services/staff.services');

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
      return res.status(200).json({ user: result.user });
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get all user", error);
    res.status(500).json({ message: "Error getting all user" });
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




const exportProductController= async(req,res) => {
  const product_id = parseInt(req.params.id, 10);
  try {
    const result = await exportProduct(product_id);
    console.log(result);
    if (result.success) {
      return res
        .status(200)
        .json({ message: "Delete successful", status: 200 });
    } else {
      return res.status(401).json({ message: "Delete failed", status: 401 });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  };
};


const editProductController = async (req, res) => {
  const { product_id, changeQuantity } = req.body;

  try {
    const result = await editProduct(product_id, changeQuantity);
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.log('Fail to update product quantity', error);
    res.status(500).json({ message: 'Fail to update product quantity' });
  }
};


module.exports = {
    createVoucherController,
    getAllUserController,
    getAllProductController,
    getOrderController,
    getVoucherController,
    getImportProductController,
   editVoucherController,
   exportProductController,
   editProductController
}


