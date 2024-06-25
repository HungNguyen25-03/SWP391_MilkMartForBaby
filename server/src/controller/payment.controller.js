const { poolPromise, sql } = require("../services/database.services");
const paymentService = require("../services/payment.services");
const axios = require("axios").default;
const CryptoJS = require("crypto-js");
const moment = require("moment");
const qs = require("qs");
require("dotenv").config();
const zaloKey1 = process.env.ZALOPAY_KEY1;
const zaloKey2 = process.env.ZALOPAY_KEY2;
const zaloAppId = process.env.ZALOPAY_APP_ID;

const config = {
  app_id: zaloAppId,
  key1: zaloKey1,
  key2: zaloKey2,
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

const paymentController = async (req, res) => {
  const embed_data = {
    redirecturl: "http://localhost:3000/customer-account",
  };
  const pool = await poolPromise;
  const order_id = req.body.order_id;

  try {
    const orderResult = await pool
      .request()
      .input("order_id", sql.Int, order_id)
      .query(`SELECT o.order_id, u.user_id, u.username, o.order_date, o.status, o.total_amount 
    FROM Orders o JOIN Users u ON o.user_id = u.user_id WHERE order_id = @order_id`);

    if (!orderResult || orderResult.recordset.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const orderData = orderResult.recordset[0];
    const itemsResult = await pool
      .request()
      .input("order_id", sql.Int, order_id)
      .query(
        `SELECT p.product_id ,p.product_name, p.stock, oi.quantity, oi.price 
      FROM Orders o JOIN Order_Items oi ON o.order_id = oi.order_id JOIN Products p 
      ON  oi.product_id = p.product_id WHERE o.order_id = @order_id
      `
      );

    if (!itemsResult) {
      return res.status(500).json({ message: "Failed to fetch order items" });
    }

    const items = itemsResult.recordset.map((item) => ({
      item_id: item.product_id,
      item_name: item.product_name,
      item_price: item.price,
      item_stock: item.stock,
      item_quantity: item.quantity,
    }));

    // const transIDRand = Math.floor(Math.random() * 1000000);
    // console.log("transIDRand", transIDRand);
    const transID = orderData.order_id;
    const app_trans_id = `${moment().format("YYMMDD")}_${transID}`;
    const order = {
      app_id: config.app_id,
      app_trans_id: app_trans_id,
      app_user: orderData.user_id,
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: orderData.total_amount,
      description: `MilkMartSystem - Payment for the order #${transID}`,
      bank_code: "",
      callback_url:
        "https://c53e-113-172-57-171.ngrok-free.app/payment/callback",
    };

    const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
      const result = await axios.post(config.endpoint, qs.stringify(order), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return res.json(result.data);
    } catch (error) {
      console.log("Payment request failed:", error.response.data);
      return res.status(500).json({
        message: "Payment request failed",
        error: error.response.data,
      });
    }
  } catch (error) {
    console.error("Error in paymentController:", error);
    return res.status(500).json({ message: "Database query failed" });
  }
};

const callbackURLController = async (req, res) => {
  let result = {};
  const pool = await poolPromise;
  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;
    //console.log("Request data:", dataStr);
    console.log("Request MAC:", reqMac);

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("Generated MAC:", mac);

    // Check if the callback is valid (from ZaloPay server)
    if (reqMac !== mac) {
      // Invalid callback
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      // Payment successful
      // Merchant updates the order status
      let dataJson = JSON.parse(dataStr);
      console.log("Data JSON:", dataJson);
      let app_trans_parts = dataJson.app_trans_id.split("_");
      let order_id = app_trans_parts[1];
      await pool
        .request()
        .input("order_id", sql.Int, order_id)
        .query(`UPDATE Orders SET status = 'paid' WHERE order_id = @order_id`);
      const orderItems = JSON.parse(dataJson.item);
      // console.log("items", orderItems);
      for (const i of orderItems) {
        // console.log("Item:", i.item_id, i.item_quantity, i.item_stock);
        await pool
          .request()
          .input("product_id", sql.Int, i.item_id)
          .input("quantity", sql.Int, i.item_quantity)
          .input("stock", sql.Int, i.item_stock)
          .query(
            `UPDATE Products SET stock = @stock - @quantity WHERE product_id = @product_id`
          );
      }
      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    console.log("Exception in callback:", ex);
    result.return_code = 0; // ZaloPay server will callback again (max 3 times)
    result.return_message = ex.message;
  }

  // Notify the result to ZaloPay server
  res.json(result);
};

const orderStatusController = async (req, res) => {
  const app_trans_id = req.params.id;
  let postData = {
    app_id: config.app_id,
    app_trans_id: app_trans_id,
  };

  let data = `${postData.app_id}|${postData.app_trans_id}|${config.key1}`;
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  let postConfig = {
    method: "post",
    url: config.endpoint.replace("/create", "/query"),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(postData),
  };

  try {
    const result = await axios(postConfig);
    return res.status(200).json(result.data);
  } catch (error) {
    console.log("Query failed:", error);
    return res.status(500).json({ message: "Query failed" });
  }
};

const getAllPaymentMethodsController = async (req, res) => {
  try {
    const result = await paymentService.getAllPaymentMethods();
    if (result.success) {
      res.json(result.paymentMethods);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Payment Methods:", error);
    res.status(500).json({ message: "Fail to get Payment Methods" });
  }
};

module.exports = {
  paymentController,
  callbackURLController,
  orderStatusController,
  getAllPaymentMethodsController,
};
