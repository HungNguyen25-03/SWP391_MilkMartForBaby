const { poolPromise, sql } = require("./database.services");
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment
require('dotenv').config();
const zaloKey1 = process.env.ZALOPAY_KEY1;
const zaloKey2 = process.env.ZALOPAY_KEY2;

// APP INFO
const config = {
    app_id: "2554",
    key1: zaloKey1,
    key2: zaloKey2,
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};

async function createOrder(order) {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("user_id", sql.Int, order.user_id)
            .input("total", sql.Decimal(18, 0), order.total)
            .input("status", sql.Int, 0)
            .query(
                `INSERT INTO Orders (user_id, total, status) OUTPUT INSERTED.order_id VALUES (@user_id, @total, @status)`
            );
        const order_id = result.recordset[0].order_id;
        return order_id;
    } catch (error) {
        console.error("Error in createOrder:", error);
        throw new Error("Database query failed");
    }
}