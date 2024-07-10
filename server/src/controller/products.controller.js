const {
  getAllProduct,
  getProductById,
  searchProductByName,
  filterProduct,
  getAllProductWihoutPagination,
  getAllCategory,
  getAvgRatingByProductId,
  getAllProductWithBrand,
} = require("../services/products.services");

//Get All Product Controller
const getProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 12;

    const { inStockProducts, outOfStockProducts, totalProducts, totalPages } =
      await getAllProduct(page, pageSize);

    res.json({
      inStockProducts,
      outOfStockProducts,
      page,
      pageSize,
      totalProducts,
      totalPages,
    });
  } catch (error) {
    console.error("Failed to get products:", error.message);
    res.status(500).json({ message: "Failed to retrieve products." });
  }
};

const getAllProductWithoutPaginationController = async (req, res) => {
  try {
    const { inStockProducts, outOfStockProducts } =
      await getAllProductWihoutPagination();
    res.json({ inStockProducts, outOfStockProducts });
  } catch (error) {
    console.error("Failed to get products without pagination", error);
    res.status(500).json({ message: "Failed to retrieve products." });
  }
};

// Get Product By ID Controller

const getProById = async (req, res) => {
  const product_id = parseInt(req.params.id, 10);
  console.log(product_id);
  try {
    const result = await getProductById(product_id);
    if (result.success) {
      res.json(result.product[0]);
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

    const { inStockProducts, outOfStockProducts, totalProducts, totalPages } =
      await searchProductByName(searchTerm, page, pageSize);

    res.json({
      inStockProducts,
      outOfStockProducts,
      page,
      pageSize,
      totalProducts,
      totalPages,
    });
  } catch (error) {
    console.error("Failed to search products", error);
    res.status(500).json({ message: "Failed to search products" });
  }
};
//Filtering Product

const filtering = async (req, res) => {
  try {
    const { ageRange, brand, country } = req.body;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 12;

    const { inStockProducts, outOfStockProducts, totalProducts, totalPages } =
      await filterProduct(ageRange, brand, country, page, pageSize);

    res.json({
      inStockProducts,
      outOfStockProducts,
      page,
      pageSize,
      totalProducts,
      totalPages,
    });
  } catch (error) {
    console.error("Error filtering products", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getAllCategoryController = async (req, res) => {
  try {
    const { brands, countries, ageRanges } = await getAllCategory();
    res.json({ brands, countries, ageRanges });
  } catch (error) {
    console.error("Failed to get all category", error);
    res.status(500).json({ message: "Failed to retrieve category." });
  }
};

const getAvgRatingByProductIdController = async (req, res) => {
  const product_id = parseInt(req.params.id, 10);
  try {
    const result = await getAvgRatingByProductId(product_id);
    if (result.success) {
      res.json({ avg_rating: result.avg_rating });
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get average rating by product ID");
  }
};

const getProductByBrandName = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 12;

    const brand_name = req.query.brand_name;

    const { inStockProducts, outOfStockProducts, totalProducts, totalPages } =
      await getAllProductWithBrand(page, pageSize, brand_name);

    res.json({
      inStockProducts,
      outOfStockProducts,
      currentPage: page,
      pageSize,
      totalProducts,
      totalPages,
    });
  } catch (error) {
    console.error("Failed to get products:", error.message);
    res.status(500).json({ message: "Failed to retrieve products." });
  }
};

module.exports = {
  getProduct,
  getProById,
  searchByName,
  filtering,
  getAllProductWithoutPaginationController,
  getAllCategoryController,
  getAvgRatingByProductIdController,

  getProductByBrandName,
};
