const {
  registerUser,
  loginUser,
  applyVoucher,
  showAllVoucher,
  getVoucherByUserId,
  claimVoucher,
  generateNewAccessToken,
  readyToCheckout,
  reviewsByProductId,
  showReviewsByProductId,
  completeOrder,
  reportProduct,
} = require("../services/users.services");

const authJwt = require("../middlewares/authJwt.middlewares");
require("dotenv").config();

const registerUserController = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const user = await registerUser(username, password, email);
    if (user.success) {
      res
        .status(200)
        .json({ message: user.message, token: user.token, status: 200 });
    } else {
      res.status(409).json({ message: user.message, status: 409 });
    }
  } catch (error) {
    res.status(500).send("Error registering user");
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);
    if (user.success) {
      res.status(200).json({
        message: "Login successful",
        user: user.user,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        status: 200,
      });
    } else {
      res.status(401).json({ message: user.message, status: 401 });
    }
  } catch (error) {
    console.error("Error in loginUserController:", error);
    res.status(500).send("Error logging in user");
  }
};

const applyVoucherController = async (req, res) => {
  const { user_id, voucher_id } = req.body;

  try {
    const voucher = await applyVoucher(user_id, voucher_id);
    if (voucher.success) {
      res.status(200).json({
        message: voucher.message,
        voucher: voucher.voucher,
        status: 200,
      });
    } else {
      res.status(409).json({ message: voucher.message, status: 409 });
    }
  } catch (error) {
    res.status(500).send("Error applying voucher");
  }
};

const showAllVoucherController = async (req, res) => {
  try {
    const vouchers = await showAllVoucher();
    if (vouchers) {
      res.status(200).json({ vouchers });
    } else {
      res.status(404).json({ message: "No vouchers found" });
    }
  } catch (error) {
    res.status(500).send("Error showing all vouchers");
  }
};

const showVoucherByUserIdController = async (req, res) => {
  const user_id = req.params.id;

  try {
    const vouchers = await getVoucherByUserId(user_id);
    if (vouchers) {
      res.status(200).json({ vouchers });
    } else {
      res.status(404).json({ message: "No vouchers found" });
    }
  } catch (error) {
    res.status(500).send("Error showing all vouchers", error);
  }
};

const claimVoucherController = async (req, res) => {
  const { voucher_id, user_id } = req.body;

  try {
    const voucher = await claimVoucher(user_id, voucher_id);
    if (voucher.success) {
      res.status(200).json({ message: voucher.message, status: 200 });
    } else {
      res.status(409).json({ message: voucher.message, status: 409 });
    }
  } catch (error) {
    res.status(500).send("Error claiming voucher");
  }
};

const refreshTokenController = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);

  try {
    const newAccessToken = await generateNewAccessToken(token);
    if (newAccessToken) {
      res.status(200).json({ accessToken: newAccessToken });
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.error("Error in refreshTokenController:", error);
    res.status(500).send("Internal Server Error");
  }
};

const logoutController = async (req, res) => {
  const { token } = req.body;
  try {
    await authJwt.removeRefreshToken(token);
    res.status(200).send("Logged out successfully");
    // res.sendStatus(204);
  } catch (error) {
    console.error("Error in logoutController:", error);
    res.status(500).send("Internal Server Error");
  }
};

const readyToCheckoutController = async (req, res) => {
  const { user_id, total_amount, orderItems } = req.body;

  try {
    const order = await readyToCheckout(user_id, total_amount, orderItems);
    if (order.success) {
      res.status(200).json({
        message: order.message,
        order_id: order.order_id,
        status: 200,
      });
    } else {
      res.status(409).json({ message: order.message, status: 409 });
    }
  } catch (error) {
    res.status(500).send("Error to pay");
  }
};

const reviewsByProductIdController = async (req, res) => {
  const { user_id, product_id, order_id, rating, comment } = req.body;

  try {
    const reviews = await reviewsByProductId(
      user_id,
      product_id,
      order_id,
      rating,
      comment
    );
    if (reviews) {
      res.status(200).json({ reviews });
    } else {
      res.status(404).json({ message: "No reviews found" });
    }
  } catch (error) {
    res.status(500).send("Error showing all reviews");
  }
};

const showReviewsByProductIdController = async (req, res) => {
  const product_id = req.params.product_id;

  try {
    const reviews = await showReviewsByProductId(product_id);
    if (reviews) {
      res.status(200).json({ reviews });
    } else {
      res.status(404).json({ message: "No reviews found" });
    }
  } catch (error) {
    res.status(500).send("Error showing all reviews");
  }
};

const completeOrderController = async (req, res) => {
  const order_id = req.params.id;

  try {
    const order = await completeOrder(order_id);
    if (order.success) {
      res.status(200).json({ message: order.message, status: 200 });
    } else {
      res.status(409).json({ message: order.message, status: 409 });
    }
  } catch (error) {
    res.status(500).send("Error completing order");
  }
};

const reportProductController = async (req, res) => {
  const { user_id, product_id, order_id, report_description } = req.body;

  try {
    const report = await reportProduct(
      user_id,
      product_id,
      order_id,
      report_description
    );
    if (report.success) {
      res.status(200).json({ message: report.message, status: 200 });
    } else {
      res.status(409).json({ message: report.message, status: 409 });
    }
  } catch (error) {
    res.status(500).send("Error reporting product");
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  applyVoucherController,
  showAllVoucherController,
  showVoucherByUserIdController,
  claimVoucherController,
  refreshTokenController,
  logoutController,
  readyToCheckoutController,
  reviewsByProductIdController,
  showReviewsByProductIdController,
  completeOrderController,
  reportProductController,
};
