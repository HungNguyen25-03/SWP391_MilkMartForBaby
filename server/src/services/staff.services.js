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
    // console.log(result);
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
    SELECT p.product_id, p.product_name, p.description, p.price, p.stock, b.brand_name, p.country_id, p.age_range, p.image_url 
    FROM Products p JOIN Brands b ON p.brand_id = b.brand_id`);
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

async function showProductDetails(product_id) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("product_id", sql.Int, product_id)
      .query(`SELECT * FROM Product_Details WHERE product_id = @product_id`);
    const product = result.recordset;
    if (product) {
      return { success: true, product };
    } else {
      return { success: false, message: "Fail to show Product Details" };
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

async function getAllVoucher() {
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
      return { success: true, vouchers: vouchers };
    } else {
      return { success: false, message: "Fail to connect Order" };
    }
  } catch (error) {
    throw error;
  }
}

async function importProduct(newProduct) {
  try {
    const pool = await poolPromise;
    const productPromises = [];

    if (!Array.isArray(newProduct)) {
      throw new TypeError("Expected newProduct to be an array");
    }

    newProduct.forEach((product) => {
      const { product_name, price, description, stock, category_id } = product;
      const promise = pool
        .request()

        .input("product_name", sql.VarChar, product_name)
        .input("description", sql.Text, description)
        .input("price", sql.Decimal, price)
        .input("stock", sql.Int, stock)
        .input("category_id", sql.Int, category_id).query(`
          INSERT INTO Products ( product_name,description, price, stock, category_id) 
          VALUES ( @product_name,@description,@price, @stock, @category_id)
        `);
      productPromises.push(promise);
    });

    await Promise.all(productPromises);

    return { success: true, message: "Products imported successfully" };
  } catch (error) {
    console.error("Error importing products", error);
    throw error;
  }
}

async function exportProduct(product_id) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input("product_id", sql.Int, product_id)
      .query(`
    DELETE From Products  WHERE product_id = @product_id;
  `);

    const product = result.rowsAffected[0];

    if (product != 0) {
      return { success: true, product };
    } else {
      return { success: false, message: "Fail to delete Product" };
    }
  } catch (error) {
    console.error("Error exporting products", error);
    throw error;
  }
}

async function deleteExpiredProduct() {
  try {
    const pool = await poolPromise;
    const currentDate = new Date();
    const nextMonthDate = new Date();
    nextMonthDate.setMonth(currentDate.getMonth() + 1);
    // Fetch products to be deleted
    const productsToDelete = await pool
      .request()
      .input("nextMonthDate", sql.DateTime, nextMonthDate).query(`
        SELECT pd.product_id, pd.quantity FROM Product_Details pd
        WHERE pd.expiration_date <= @nextMonthDate
      `);

    const products = productsToDelete.recordset;
    // Delete products from Product_Details table
    await pool.request().input("nextMonthDate", sql.DateTime, nextMonthDate)
      .query(`
        DELETE FROM Product_Details
        WHERE expiration_date <= @nextMonthDate
      `);

    // Decrement the stock in Products table
    for (const product of products) {
      await pool
        .request()
        .input("product_id", sql.Int, product.product_id)
        .input("quantity", sql.Int, product.quantity).query(`
          UPDATE Products
          SET stock = stock - @quantity
          WHERE product_id = @product_id
        `);
    }

    return {
      success: true,
      message: "Expired products deleted and stock updated successfully",
    };
  } catch (error) {
    console.error("Error deleting expired products:", error);
    throw error;
  }
}

async function editProduct(product_id, changeQuantity) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input("product_id", sql.Int, product_id)
      .query(`
       Select stock From Products WHERE product_id = @product_id;
     `);

    if (result.recordset.length === 0) {
      return { success: false, message: "Product not found" };
    }

    const currentStock = result.recordset[0].stock;
    const newStock = currentStock + changeQuantity;
    if (newStock < 0) {
      return { success: false, message: "Insufficient stock to reduce" };
    }
    await pool
      .request()
      .input("product_id", sql.Int, product_id)
      .input("new_stock", sql.Int, newStock)
      .query(
        "UPDATE Products SET stock = @new_stock WHERE product_id = @product_id"
      );

    return { success: true, message: "Product quantity updated successfully" };
  } catch (error) {
    throw error;
  }
}

async function cancelOrder(order_id) {
  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("order_id", sql.Int, order_id)
      .query(
        `UPDATE Orders SET status = 'Cancelled' WHERE order_id = @order_id;`
      );
    if (result.rowsAffected[0] > 0) {
      return { success: true, message: "Order cancel successfully" };
    } else {
      return { success: false, message: "Failed to cancel order" };
    }
  } catch (error) {
    throw error;
  }
}

async function confirmOrder(order_id) {
  try {
    const pool = await poolPromise;

    // Confirm the order
    const confirmResult = await pool
      .request()
      .input("order_id", sql.Int, order_id)
      .query(
        `UPDATE Orders SET status = 'Confirmed' WHERE order_id = @order_id`
      );

    if (confirmResult.rowsAffected[0] === 0) {
      return { success: false, message: "Failed to confirm order" };
    }

    // Verify if the status is 'Confirmed'
    const currentStatusResult = await pool
      .request()
      .input("order_id", sql.Int, order_id)
      .query(`SELECT status FROM Orders WHERE order_id = @order_id`);

    if (currentStatusResult.recordset.length === 0) {
      return { success: false, message: "Order not found" };
    }

    const currentStatus = currentStatusResult.recordset[0].status;
    // console.log("Current status:", currentStatus);
    if (currentStatus !== "Confirmed") {
      return {
        success: false,
        message: "Order status must be 'Confirmed' to change to 'Delivered'",
      };
    }

    // Set timeout to change status to 'Delivered'
    setTimeout(async () => {
      try {
        await pool
          .request()
          .input("order_id", sql.Int, order_id)
          .query(
            `UPDATE Orders SET status = 'Delivered' WHERE order_id = @order_id`
          );
        console.log(`Order ${order_id} status changed to Delivered`);
      } catch (error) {
        console.error(`Error updating order ${order_id} to Delivered:`, error);
      }
    }, 60000); // 1 minute in milliseconds

    return {
      success: true,
      message: `Order ${order_id} confirmed and will be marked as Delivered in 1 minute`,
    };
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
    throw new Error("Failed to update order status");
  }
}

async function addProduct(
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
) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("product_name", sql.NVarChar, product_name)
      .input("description", sql.NVarChar, description)
      .input("price", sql.Decimal, price)
      .input("stock", sql.Int, stock)
      .input("brand_id", sql.Int, brand_id)
      .input("country_id", sql.Char, country_id)
      .input("age_range", sql.VarChar, age_range)
      .input("image_url", sql.VarChar, image_url).query(`
      INSERT INTO Products (product_name, description, price, stock, brand_id, country_id, age_range, image_url) OUTPUT INSERTED.product_id
      VALUES (@product_name, @description, @price, @stock, @brand_id, @country_id, @age_range, @image_url)
    `);
    const product_id = result.recordset[0].product_id;
    await pool
      .request()
      .input("product_id", sql.Int, product_id)
      .input("production_date", sql.DateTime, production_date)
      .input("expiration_date", sql.DateTime, expiration_date)
      .input("quantity", sql.Int, stock)
      .query(
        `INSERT INTO Product_Details (product_id, production_date, expiration_date, quantity) VALUES (@product_id, @production_date, @expiration_date, @quantity)`
      );

    return { success: true, message: "Product successfully added" };
  } catch (error) {
    console.error("Error adding or updating product:", error);
    throw error;
  }
}

async function addProductDetails(
  product_id,
  production_date,
  expiration_date,
  quantity
) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("product_id", sql.Int, product_id)
      .input("production_date", sql.DateTime, production_date)
      .input("expiration_date", sql.DateTime, expiration_date)
      .input("quantity", sql.Int, quantity).query(`
      INSERT INTO Product_Details (product_id, production_date, expiration_date, quantity)
      VALUES (@product_id, @production_date, @expiration_date, @quantity)
    `);
    await pool
      .request()
      .input("product_id", sql.Int, product_id)
      .input("stock", sql.Int, quantity)
      .query(
        `UPDATE Products SET stock = stock + @stock WHERE product_id = @product_id`
      );
    return { success: true, message: "Product details added successfully" };
  } catch (error) {
    console.error("Error adding product details:", error);
    throw error;
  }
}

async function updateProduct(
  product_id,
  product_name,
  description,
  price,
  brand_name,
  country_id,
  age_range,
  image_url
) {
  try {
    const pool = await poolPromise;
    const request = pool.request().input("product_id", product_id);

    let updateFields = [];

    if (product_name) {
      request.input("product_name", product_name);
      updateFields.push("product_name = @product_name");
    }

    if (description) {
      request.input("description", description);
      updateFields.push("description = @description");
    }

    if (price) {
      request.input("price", price);
      updateFields.push("price = @price");
    }

    if (country_id) {
      request.input("country_id", country_id);
      updateFields.push("country_id = @country_id");
    }

    if (age_range) {
      request.input("age_range", age_range);
      updateFields.push("age_range = @age_range");
    }

    if (image_url) {
      request.input("image_url", image_url);
      updateFields.push("image_url = @image_url");
    }

    let brandId;
    if (brand_name) {
      const brandRequest = pool.request().input("brand_name", brand_name);
      const brandQuery = `SELECT brand_id FROM Brands WHERE brand_name = @brand_name`;
      const brandResult = await brandRequest.query(brandQuery);

      if (brandResult.recordset.length > 0) {
        brandId = brandResult.recordset[0].brand_id;
        request.input("brand_id", brandId);
        updateFields.push("brand_id = @brand_id");
      } else {
        return { success: false, message: "Brand name not found" };
      }
    }

    if (updateFields.length === 0) {
      return { success: false, message: "No fields to update" };
    }

    const query = `
    UPDATE Products
    SET ${updateFields.join(", ")}
    WHERE product_id = @product_id`;

    const result = await request.query(query);

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return { success: true, message: "Product updated successfully" };
    } else {
      return { success: false, message: "Failed to update product" };
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      message: "Failed to update product",
      error: error.message,
    };
  }
}

async function createPost(
  user_id,
  title,
  description,
  image_url,
  productItems
) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("title", sql.NVarChar, title)
      .input("description", sql.NVarChar, description)
      .input("image_url", sql.NVarChar, image_url).query(`
        INSERT INTO Posts (user_id, title, description, image_url) OUTPUT INSERTED.post_id
        VALUES (@user_id, @title, @description, @image_url)
      `);

    const postId = result.recordset[0].post_id;

    await insertPostDetails(postId, productItems);

    return { success: true, message: "Post created successfully" };
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

async function insertPostDetails(post_id, productItems) {
  // console.log("Product items:", productItems);
  try {
    const pool = await poolPromise;

    for (const item of productItems) {
      // console.log("Item:", item);
      await pool
        .request()
        .input("post_id", sql.Int, post_id)
        .input("product_id", sql.Int, item)
        .query(
          `INSERT INTO Post_Details (post_id, product_id) VALUES (@post_id, @product_id)`
        );
    }

    return { success: true, message: "Product details inserted successfully" };
  } catch (error) {
    console.error("Error inserting product details:", error);
    throw error;
  }
}

async function updatePost(
  post_id,
  user_id,
  title,
  description,
  image_url,
  productItems
) {
  try {
    const pool = await poolPromise;
    const request = pool.request().input("post_id", post_id);
    let updatedFields = [];
    request.input("user_id", user_id);
    updatedFields.push("user_id = @user_id");
    if (title) {
      request.input("title", title);
      updatedFields.push("title = @title");
    }
    if (description) {
      request.input("description", description);
      updatedFields.push("description = @description");
    }
    if (image_url) {
      request.input("image_url", image_url);
      updatedFields.push("image_url = @image_url");
    }
    if (updatedFields.length === 0 && !productItems) {
      return { success: false, message: "No fields to update" };
    }

    const query = `
      UPDATE Posts
      SET ${updatedFields.join(", ")}
      WHERE post_id = @post_id
    `;
    const result = await request.query(query);

    if (productItems) {
      await updatePostDetails(post_id, productItems);
    }

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return { success: true, message: "Post updated successfully" };
    } else {
      return { success: false, message: "Failed to update post" };
    }
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

async function updatePostDetails(post_id, newProductItems) {
  try {
    const pool = await poolPromise;

    // Fetch current product items
    const currentProductItemsResult = await pool
      .request()
      .input("post_id", sql.Int, post_id)
      .query(`SELECT product_id FROM Post_Details WHERE post_id = @post_id`);
    const currentProductItems = currentProductItemsResult.recordset.map(
      (item) => item.product_id
    );

    // Determine items to add and remove
    const itemsToAdd = newProductItems.filter(
      (item) => !currentProductItems.includes(item)
    );
    const itemsToRemove = currentProductItems.filter(
      (item) => !newProductItems.includes(item)
    );

    // Remove old items
    for (const item of itemsToRemove) {
      await pool
        .request()
        .input("post_id", sql.Int, post_id)
        .input("product_id", sql.Int, item)
        .query(
          `DELETE FROM Post_Details WHERE post_id = @post_id AND product_id = @product_id`
        );
    }

    // Add new items
    for (const item of itemsToAdd) {
      await pool
        .request()
        .input("post_id", sql.Int, post_id)
        .input("product_id", sql.Int, item)
        .query(
          `INSERT INTO Post_Details (post_id, product_id) VALUES (@post_id, @product_id)`
        );
    }

    return { success: true, message: "Product details updated successfully" };
  } catch (error) {
    console.error("Error updating product details:", error);
    throw error;
  }
}

async function deletePost(post_id) {
  try {
    const pool = await poolPromise;

    await deletePostDetails(post_id);

    const result = await pool
      .request()
      .input("post_id", sql.Int, post_id)
      .query(`DELETE FROM Posts WHERE post_id = @post_id`);

    if (result.rowsAffected[0] > 0) {
      return { success: true, message: "Post deleted successfully" };
    } else {
      return { success: false, message: "Failed to delete post" };
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

// Function to delete post details
async function deletePostDetails(post_id) {
  const pool = await poolPromise;

  await pool
    .request()
    .input("post_id", sql.Int, post_id)
    .query(`DELETE FROM Post_Details WHERE post_id = @post_id`);
}

async function showAllReport() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
    SELECT 
    Reports.report_id,
    Reports.report_date,
    Reports.report_description,
    Users.username,
    Products.product_name

    FROM Reports
    JOIN Users
    ON Reports.user_id = Users.user_id
    JOIN Products
    ON Reports.product_id = Products.product_id
    `);
    const report = result.recordset;

    if (report) {
      return { success: true, report };
    } else {
      return { success: false, message: "Fail to connect Report" };
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createVoucher,
  getAllUser,
  getAllProduct,
  getAllOrder,
  getAllVoucher,
  importProduct,
  editVoucher,
  exportProduct,
  editProduct,
  confirmOrder,
  cancelOrder,
  addProduct,
  updateProduct,
  createPost,
  updatePost,
  deletePost,
  showAllReport,
  addProductDetails,
  showProductDetails,
  deleteExpiredProduct,
};
