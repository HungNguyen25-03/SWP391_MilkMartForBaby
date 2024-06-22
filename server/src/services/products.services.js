const { poolPromise, sql } = require("./database.services");

async function getAllProduct() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`SELECT * FROM Products`);
    const product = result.recordset;

    if (product) {
      return { success: true, product };
    } else {
      return { success: false, message: "Fail to show all Products" };
    }
  } catch (error) {
    throw error;
  }
}

async function getProductById(product_id) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`SELECT * FROM Products WHERE product_id='${product_id}'`);
    const product = result.recordset;
    if (product) {
      return { success: true, product };
    } else {
      return { success: false, message: "Invalid ID product" };
    }
  } catch (error) {
    throw error;
  }
}

async function searchProductByName(searchTerm) {
  try {
    const pool = await poolPromise;

    const result = await pool
      .request()

      .input("searchTerm", sql.VarChar, `%${searchTerm}%`).query(`

      SELECT 
       *

      FROM Products

      WHERE product_name LIKE @searchTerm
    `);

    const products = result.recordset;

    if (products.length > 0) {
      return { success: true, products };
    } else {
      return { success: false, message: "No products found" };
    }
  } catch (error) {
    console.error("Error searching for products", error);
    throw error;
  }

};

async function filterProduct(ageRange, brand, country) {
  try {
    const pool = await poolPromise;
    const request = pool.request();

    let filters = [];

    if (ageRange) {
      if (!Array.isArray(ageRange)) {
        ageRange = [ageRange];
      }


      request.input('ageRange', sql.NVarChar, ageRange.join(','));
      filters.push("age_range IN (SELECT value FROM STRING_SPLIT(@ageRange,','))");
    }

    if (brand) {
      if (!Array.isArray(brand)) {
        brand = [brand];
      }
      request.input('brand', sql.NVarChar, brand.join(','));
      filters.push("brand_name IN (SELECT value FROM STRING_SPLIT (@brand,','))");
    }

    if (country) {
      if (!Array.isArray(country)) {
        country = [country];
      }
      request.input('country', sql.NVarChar, country.join(','));
      filters.push("country_name IN (SELECT value FROM STRING_SPLIT (@country, ','))");

    }

    let query = `
    SELECT 
      p.product_id,
      p.product_name,
      p.description,
      p.price,
      p.stock,
      b.brand_name,
      oc.country_name,
      p.age_range
    FROM Products p
    LEFT JOIN Brands b ON p.brand_id = b.brand_id
    LEFT JOIN Originated_Country oc ON p.country_id = oc.country_id
    
  `;

    if (filters.length > 0) {
      query += " WHERE " + filters.join(" AND ");
    }

    const result = await request.query(query);
    const products = result.recordset;

    return products.length > 0
      ? { success: true, products }
      : { success: false, message: "No products found" };
  } catch (error) {
    console.error("Error filtering products", error);
    throw error;
  }
}

module.exports = {
  getAllProduct,
  getProductById,
  searchProductByName,
  filterProduct,
};
