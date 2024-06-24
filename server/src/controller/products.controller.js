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
    const pageSize = parseInt(req.body.pageSize) || 12;

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
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 12;

    const { inStockProducts, outOfStockProducts, totalProducts } =
      await searchProductByName(searchTerm, page, pageSize);
    res.json({
      inStockProducts,
      outOfStockProducts,
      page,
      pageSize,
      totalProducts,
    });
  } catch (error) {
    console.error("Failed to search products", error);
    res.status(500).json({ message: "Failed to search products" });
  }
};
//Filtering Product

const filtering = async (req, res) => {
  try {
    const { ageRange, brand, country, page, pageSize } = req.body;
    const pageNumber = parseInt(page) || 1;
    const size = parseInt(pageSize) || 12;

    const { inStockProducts, outOfStockProducts, totalProducts } =
      await filterProduct(ageRange, brand, country, pageNumber, size);
    res.json({
      inStockProducts,
      outOfStockProducts,
      page,
      pageSize,
      totalProducts,
    });
  } catch (error) {
    console.error("Error filtering products", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getProduct,
  getProById,
  searchByName,
  filtering,
};
