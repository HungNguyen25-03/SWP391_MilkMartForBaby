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
};

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
};




async function searchProductByName(searchTerm){
  try {
    const pool= await poolPromise;
    
    const result= await pool 
    .request()
      .input('searchTerm',sql.VarChar, `%${searchTerm}%`)
      .query(`
      SELECT 
        product_id,
        product_name,
        price,
        stock,
        category_id

      FROM Products

      WHERE product_name LIKE @searchTerm
    `);
     
      const products= result.recordset;
      
      if (products.length > 0) {
        return { success: true, products };
      } else {
        return { success: false, message: 'No products found' };
      }
    } catch (error) {
      console.error('Error searching for products', error);
      throw error;
    }
  };





async function filterProduct(ageRange, brand, country) {
  try {
    const pool = await poolPromise;
    const request = pool.request();

    if (ageRange) {
      request.input('ageRange', sql.NVarChar, ageRange);
    }
    if (brand) {
      request.input('brand', sql.NVarChar, brand);
    }
    if (country) {
      request.input('country', sql.NVarChar, country);
    }

    let query = `
      SELECT 
        product_id,
        product_name,
        description,
        price,
        stock,
        brand_id,
        country_id,
        age_range,
        category_id
      FROM Products
      WHERE 1=1
    `;

    if (ageRange) {
      query += ` AND age_range = @ageRange`;
    }
    if (brand) {
      query += ` AND brand_id = (
        SELECT brand_id FROM Brands WHERE brand_name = @brand
      )`;
    }
    if (country) {
      query += ` AND country_id = (
        SELECT country_id FROM Originated_Country WHERE country_name = @country
      )`;
    }



    const result = await request.query(query);
    const product = result.recordset;

    return product.length > 0 
      ? { success: true, product}
      : { success: false, message: "No products found" };
  } catch (error) {
    console.error('Error filtering products', error);
    throw error;
  }
}




module.exports = {
  getAllProduct,
  getProductById,
  searchProductByName,
  filterProduct
};
