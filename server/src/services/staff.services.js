const { pool } = require("mssql");
const { poolPromise, sql } = require("./database.services");
const crypto = require("crypto");

async function createVoucher(discount, expiration_date) {
  try {
    const pool = await poolPromise;
    let code;
    let isUnique = false;

    // Generate a unique voucher code
    while (!isUnique) {
      code = generateVoucherCode();
      const result = await pool
        .request()
        .input("code", sql.VarChar, code)
        .query(`SELECT COUNT(*) as count FROM Vouchers WHERE code = @code`);

      if (result.recordset[0].count === 0) {
        isUnique = true;
      }
    }

    // Insert the voucher into the database
    const result = await pool
      .request()
      .input("code", sql.VarChar, code)
      .input("discount", sql.Decimal, discount)
      .input("expiration_date", sql.DateTime, new Date(expiration_date))
      .query(`INSERT INTO Vouchers (code, discount, expiration_date) 
                VALUES (@code, @discount, @expiration_date)`);
    console.log(result);
    return { success: true, message: "Voucher created successfully" };
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
}

function generateVoucherCode() {
  return crypto.randomBytes(8).toString("hex").toUpperCase();
}

async function getAllUser() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
      Users.user_id,
      Users.username,
      Users.role_id
      
      FROM Users WHERE status = 1`);
    const user = result.recordset;
    if (user) {
      return { success: true, user };
    } else {
      return { success: false, message: "Fail to get All User" };
    }
  } catch (error) {
    throw error;
  }
}

async function getAllProduct() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
    SELECT 
    Products.product_id,
    Products.product_name,
    Products.price,
    Products.stock,
    Category.category_name

    FROM Products
    JOIN Category
    ON Products.category_id=Category.category_id ;
    `);
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

async function getAllOrder() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
    SELECT 
     Orders.order_id,
     Orders.order_date,
     Users.username,
     Orders.status,
     Orders.total_amount

     FROM
     Orders
     JOIN
     Users
     
     ON
     Orders.user_id=Users.user_id;


    
    `);
    const order = result.recordset;

    if (order) {
      return { success: true, order };
    } else {
      return { success: false, message: "Fail to connect Order" };
    }
  } catch (error) {
    throw error;
  }
}

const editVoucher = async (voucher_id, discount, expiration_date) => {
  try {
    const pool = await poolPromise;
    const request = pool.request().input("voucher_id", voucher_id);

    let updateFields = [];
    if (discount) {
      request.input("discount", discount);
      updateFields.push("discount = @discount");
    }

    if (expiration_date) {
      const formattedDate = new Date(expiration_date);
      request.input("expiration_date", formattedDate);
      updateFields.push("expiration_date = @expiration_date");
    }

    if (updateFields.length === 0) {
      return { success: false, message: "No fields to update" };
    }

    const query = `
      UPDATE Vouchers
      SET ${updateFields.join(", ")}
      WHERE voucher_id = @voucher_id`;

    const result = await request.query(query);

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return { success: true, message: "Voucher updated successfully" };
    } else {
      return { success: false, message: "Failed to update voucher" };
    }
  } catch (error) {
    console.error("Error updating voucher:", error);
    throw error;
  }
};




async function getAllVoucher(){

  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`

   Select 

   Vouchers.voucher_id,
   Vouchers.code,
   Vouchers.discount

   from Vouchers

    
    `);
    const vouchers = result.recordset;

    if (vouchers) {
      return { success: true, vouchers };
    } else {
      return { success: false, message: "Fail to connect Order" };
    }
  } catch (error) {
    throw error;
  }
};



async function importProduct(newProduct) {
  try {
    const pool = await poolPromise;
    const productPromises = [];

    if (!Array.isArray(newProduct)) {
      throw new TypeError('Expected newProduct to be an array');
    }

    newProduct.forEach(product => {
      const {  product_name, price,description, stock, category_id } = product;
      const promise = pool.request()
      
        .input('product_name', sql.VarChar, product_name)
        .input('description',sql.Text,description)
        .input('price', sql.Decimal, price)
        .input('stock', sql.Int, stock)
        .input('category_id', sql.Int, category_id)
        .query(`
          INSERT INTO Products ( product_name,description, price, stock, category_id) 
          VALUES ( @product_name,@description,@price, @stock, @category_id)
        `);
      productPromises.push(promise);
    });

    await Promise.all(productPromises);

    return { success: true, message: 'Products imported successfully' };
  } catch (error) {
    console.error('Error importing products', error);
    throw error;
  }
}


async function exportProduct(product_id){
  try {
    const pool= await  poolPromise;
    const result = await pool.request().input("product_id",sql.Int,product_id).query(`
    DELETE From Products  WHERE product_id = @product_id;
  `);

  const product = result.rowsAffected[0];
  console.log(product);
  console.log(result);
  if (product != 0) {
    return { success: true, product };
  } else {
    return { success: false, message: "Fail to delete Product" };
  }

  } catch (error) {
    console.error('Error exporting products', error);
    throw error;
  }
}


async function editProduct(product_id,changeQuantity){
    try {
       const pool=await poolPromise;
       const result= await pool.request().input("product_id",sql.Int,product_id).query(`
       Select stock From Products  WHERE product_id = @product_id;
     `);
    
     if (result.recordset.length === 0) {
      return { success: false, message: 'Product not found' };
    }

    const currentStock = result.recordset[0].stock;
    const newStock = currentStock + changeQuantity;
    if(newStock<0){
      return { success: false, message: 'Insufficient stock to reduce' };
    }
    await pool.request()
    .input('product_id', sql.Int, product_id)
    .input('new_stock', sql.Int, newStock)
    .query('UPDATE Products SET stock = @new_stock WHERE product_id = @product_id');

  return { success: true, message: 'Product quantity updated successfully' };




    } catch (error) {
      throw error;
    }
};



module.exports = {
  createVoucher,
  getAllUser,
  getAllProduct,
  getAllOrder,
  getAllVoucher,
  importProduct,
  editVoucher,
  exportProduct,
  editProduct
};
