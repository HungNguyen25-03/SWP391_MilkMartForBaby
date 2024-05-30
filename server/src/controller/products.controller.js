const { getAllProduct } = require("../services/products.services");

const getProduct = async (req, res) => {
  try {
    const result = await getAllProduct();
    if (result.success) {
      res.json(result.product);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Faill");
  }
};

module.exports = {
  getProduct,
};
