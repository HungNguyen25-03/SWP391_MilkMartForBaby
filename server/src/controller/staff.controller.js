const {
  createVoucher,
  getAllUser,
  getAllProduct,
  getAllOrder,
  getAllVoucher,
  importProduct,
  exportProduct,
  editProduct,
  confirmOrder,
  cancelOrder,
  addProduct,
  updateProduct,
  createPost,
  editVoucher,
  updatePost,
  deletePost,
  showAllReport,
  addProductDetails,
  showProductDetails,
  deleteExpiredProduct,
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
      res.json(result.user);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Faill to get User");
  }
};

const getAllProductController = async (req, res) => {
  try {
    const result = await getAllProduct();
    console.log(result);
    if (result.success) {
      res.json(result.product);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Faill to get Product");
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

const deleteExpiredProductController = async (req, res) => {
  try {
    const result = await deleteExpiredProduct();
    if (result.success) {
      return res.status(200).json({
        message: result.message,
        status: 200,
      });
    }
  } catch (error) {
    console.log("fail to delete expired product");
  }
};

const getVoucherController = async (req, res) => {
  try {
    const result = await getAllVoucher();
    console.log(result);

    if (result.success) {
      return res.status(200).json(result.vouchers);
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
  console.log(
    `Request to update voucher: id=${voucher_id}, discount=${discount}, expiration_date=${expiration_date}`
  );

  try {
    const result = await editVoucher(voucher_id, discount, expiration_date);
    console.log("Update result:", result);

    if (result.success) {
      res.status(200).json({ message: result.message, status: 200 });
    } else {
      res.status(409).json({ message: result.message, status: 409 });
    }
  } catch (error) {
    console.error("Error in editVoucherController:", error); // Improved logging
    res
      .status(500)
      .json({ message: "Error updating voucher", error: error.message });
  }
};

const getImportProductController = async (req, res) => {
  const newProduct = req.body;
  if (!Array.isArray(newProduct)) {
    return res
      .status(400)
      .json({ message: "Invalid input. Expected an array of products." });
  }
  try {
    const result = await importProduct(newProduct);
    if (result.success) {
      res.json(result.message);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to import Product");
  }
};

const exportProductController = async (req, res) => {
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
  }
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
    console.log("Fail to update product quantity", error);
    res.status(500).json({ message: "Fail to update product quantity" });
  }
};

const confirmOrderController = async (req, res) => {
  const { order_id } = req.body;

  if (!Number.isInteger(order_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid order_id. It must be an integer.",
    });
  }
  try {
    const result = await confirmOrder(order_id);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

const cancelOrderController = async (req, res) => {
  const { order_id } = req.body;
  if (!order_id) {
    return res
      .status(400)
      .json({ success: false, message: "Order ID is required" });
  }
  try {
    const result = await cancelOrder(order_id);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

const addProductController = async (req, res) => {
  const {
    product_name,
    description,
    price,
    stock,
    brand_id,
    country_id,
    age_range,
    image_url,
    production_date,
    expiration_date,
  } = req.body;
  try {
    const result = await addProduct(
      product_name,
      description,
      price,
      stock,
      brand_id,
      country_id,
      age_range,
      image_url,
      production_date,
      expiration_date
    );
    if (result.success) {
      return res.status(200).json({
        message: result.message,
        status: 200,
      });
    }
  } catch (error) {
    console.log("fail to add a product");
    throw error;
  }
};

const showProductDetailsController = async (req, res) => {
  const product_id = parseInt(req.params.id, 10);
  try {
    const result = await showProductDetails(product_id);
    console.log(result);
    if (result.success) {
      return res.status(200).json(result.product);
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get product details", error);
    res.status(500).json({ message: "Error getting product details" });
  }
};

const updateProductController = async (req, res) => {
  const product_id = parseInt(req.params.id, 10);
  const {
    product_name,
    description,
    price,
    brand_name,
    country_id,
    age_range,
    image_url,
  } = req.body;
  console.log(req.body);
  try {
    const result = await updateProduct(
      product_id,
      product_name,
      description,
      price,
      brand_name,
      country_id,
      age_range,
      image_url
    );
    if (result.success) {
      return res.status(200).json({
        message: result.message,
        status: 200,
      });
    } else {
      return res.status(401).json({
        message: result.message,
        status: 401,
      });
    }
  } catch (error) {
    console.log("fail to update a product");
    throw error;
  }
};

const addProductDetailsController = async (req, res) => {
  const product_id = parseInt(req.params.id, 10);
  const { production_date, expiration_date, quantity } = req.body;
  console.log(req.body);
  try {
    const result = await addProductDetails(
      product_id,
      production_date,
      expiration_date,
      quantity
    );
    if (result.success) {
      return res.status(200).json({
        message: result.message,
        status: 200,
      });
    }
  } catch (error) {
    console.log("fail to add product details");
    throw error;
  }
};

const createPostController = async (req, res) => {
  const { user_id, title, description, image_url, productItems } = req.body;
  console.log(req.body);
  try {
    const result = await createPost(
      user_id,
      title,
      description,
      image_url,
      productItems
    );
    console.log(result);
    if (result.success) {
      return res.status(200).json({
        message: result.message,
        status: 200,
      });
    }
  } catch (error) {
    console.log("fail to create a post");
  }
};

const updatePostController = async (req, res) => {
  const post_id = parseInt(req.params.id, 10);
  const { user_id, title, description, image_url } = req.body;
  console.log(req.body);
  try {
    const result = await updatePost(
      post_id,
      user_id,
      title,
      description,
      image_url
    );
    console.log(result);
    if (result.success) {
      return res.status(200).json({
        message: result.message,
        status: 200,
      });
    }
  } catch (error) {
    console.log("fail to update a post");
  }
};

const deletePostController = async (req, res) => {
  const post_id = parseInt(req.params.id, 10);
  const { productItems } = req.body;
  try {
    const result = await deletePost(post_id, productItems);
    console.log(result);
    if (result.success) {
      return res.status(200).json({
        message: result.message,
        status: 200,
      });
    }
  } catch (error) {
    console.log("fail to delete a post");
  }
};

const showAllReportController = async (req, res) => {
  try {
    const result = await showAllReport();
    console.log(result);
    if (result.success) {
      return res.status(200).json(result.report);
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get all report", error);
    res.status(500).json({ message: "Error getting all report" });
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
  editProductController,
  confirmOrderController,
  cancelOrderController,
  addProductController,
  updateProductController,
  createPostController,
  updatePostController,
  deletePostController,
  showAllReportController,
  addProductDetailsController,
  showProductDetailsController,
  deleteExpiredProductController,
};
