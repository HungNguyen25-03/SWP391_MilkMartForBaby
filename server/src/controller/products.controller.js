const {
  getAllProduct,
  getProductById,
  searchProductByName,
  filterProduct,
} = require("../services/products.services");

//Get All Product Controller
const getProduct = async (req, res) => {
  try {
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 4;

    const { inStockProducts, outOfStockProducts, totalProducts } =
      await getAllProduct(page, pageSize);

    res.json({
      inStockProducts,
      outOfStockProducts,
      page,
      pageSize,
      totalProducts,
    });
  } catch (error) {
    console.log("Failed to get products:", error);
    res.status(500).json({ message: "Failed to retrieve products." });
  }
};

// Get Product By ID Controller

const getProById = async (req, res) => {
  const { product_id } = req.body;
  console.log(product_id);
  try {
    const result = await getProductById(product_id);
    if (result.success) {
      res.json(result.product);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Product by ID");
  }
};

// Search Product By Name

const searchByName = async (req, res) => {
  const searchTerm = req.query.searchTerm?.trim();

  if (!searchTerm) {
    return res.status(200).json([]); // Return an empty array if no search term is provided
  }

  console.log(`Search term: ${searchTerm}`);

  try {
    const result = await searchProductByName(searchTerm);
    if (result.success) {
      res.json(result.products);
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error("Fail to search products", error);
    res.status(500).json({ message: "Fail to search products" });
  }
};
//Filtering Product

const filtering = async (req, res) => {
  try {
    const { ageRange, brand, country } = req.body;
    const result = await filterProduct(ageRange, brand, country);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getProduct,
  getProById,
  searchByName,
  filtering,
};
