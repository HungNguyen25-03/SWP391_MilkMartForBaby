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





async function filterProduct(ageRange,brand,country) {
  try {
    const pool = await poolPromise;
    const request = pool.request();

   let ageFields=[];
   let brandFields=[];
   let countryFeilds=[];
   if(ageFields.length === 0 && brandFields === 0 && countryFeilds.length === 0){
     getAllProduct;
   } else if (ageFields.length === 0 && brandFields === 0 ){
   
   }


    
  }catch(error){
  throw error;
  }
};




module.exports = {
  getAllProduct,
  getProductById,
  searchProductByName,
  filterProduct
};
