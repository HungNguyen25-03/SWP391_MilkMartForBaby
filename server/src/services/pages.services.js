const { poolPromise, sql } = require("./database.services");

async function getPaged(page, pageSize) {


    try {
        const pool = await poolPromise;
        const request = pool.request();

        const offset = (page - 1) * pageSize;


        request.input('offset', sql.Int, offset);
        request.input('pageSize', sql.Int, pageSize);

        const query = `
          SELECT 
            *
          FROM Products
          ORDER BY product_id
          OFFSET @offset ROWS
          FETCH NEXT @pageSize ROWS ONLY
        `;


        const result = await request.query(query);
        const products = result.recordset;


        const countQuery = 'SELECT COUNT(*) AS total FROM Products';
        const countResult = await pool.request().query(countQuery);
        const totalItems = countResult.recordset[0].total;


        return {
            success: true,
            data: products,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            currentPage: page,
        };
    } catch (error) {
        console.error('Error fetching paginated products:', error);
        throw error;
    }
};

module.exports = {
    getPaged
};

