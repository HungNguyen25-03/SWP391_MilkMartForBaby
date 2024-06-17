const { poolPromise, sql } = require("../services/database.services");
const paymentService = require("../services/payment.services");
const axios = require("axios").default; // npm install axios
const CryptoJS = require("crypto-js"); // npm install crypto-js
const moment = require("moment"); // npm install moment
const qs = require("qs");
require("dotenv").config();
const zaloKey1 = process.env.ZALOPAY_KEY1;
const zaloKey2 = process.env.ZALOPAY_KEY2;
const zaloAppId = process.env.ZALOPAY_APP_ID;

// APP INFO
const config = {
  app_id: zaloAppId,
  key1: zaloKey1,
  key2: zaloKey2,
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

const paymentController = async (req, res) => {
  // change after deploy to cloud
  const embed_data = {
    redirecturl: "https://www.youtube.com/",
  };

  const orderResult = await paymentService.getOrderById();

  const items = [{}]; // change based on db
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: "user123", // change based on db
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: 50000, //change base on db
    description: `Lazada - Payment for the order #${transID}`, // change based on db
    bank_code: "",
    callback_url: "https://c525-113-172-57-171.ngrok-free.app/payment/callback",
  };

  console.log("app_trans_id = ", order.app_trans_id);
  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data =
    config.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const result = await axios.post(config.endpoint, null, { params: order });
    return res.json(result.data);
  } catch (error) {
    console.log(error);
  }
};

const callbackURLController = async (req, res) => {
  // APP INFO

  let result = {};

  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng
      let dataJson = JSON.parse(dataStr, config.key2);
      // change based on db when payment is successfull update order status
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson["app_trans_id"]
      );

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
};

const orderStatusController = async (req, res) => {
  const app_trans_id = req.params.id;
  let postData = {
    app_id: config.app_id,
    app_trans_id: app_trans_id, // Input your app_trans_id
  };

  let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  let postConfig = {
    method: "post",
    url: "https://sb-openapi.zalopay.vn/v2/query",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(postData),
  };
  try {
    const result = await axios(postConfig);
    return res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
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
    console.log("Fail to get Payment Methods");
  }
};
module.exports = {
  paymentController,
  callbackURLController,
  orderStatusController,
  getAllPaymentMethodsController,
};
