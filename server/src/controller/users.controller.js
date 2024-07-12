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
  getPostById,
  showAllPosts,
  requestPasswordReset,
  resetPassword,
  showLoyaltyPoints,
  showTop4Post,
  useLoyaltyPoints,
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
        orderInfo: order.orderInfo,
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
      res.status(200).json(reviews);
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

const getPostByIdController = async (req, res) => {
  const post_id = parseInt(req.params.id, 10);
  try {
    const result = await getPostById(post_id);
    if (result.success) {
      res.json(result.post);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Post");
  }
};

const showLoyaltyPointsController = async (req, res) => {
  const customer_id = req.params.id;
  try {
    const result = await showLoyaltyPoints(customer_id);
    if (result.success) {
      res.json(result.loyaltyPoints);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Points");
  }
};

const showAllPostsController = async (req, res) => {
  try {
    const result = await showAllPosts();
    if (result.success) {
      res.status(200).json(result.posts);
    } else {
      res.status(409).json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Posts");
  }
};

const requestPasswordResetController = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await requestPasswordReset(email);
    if (response.success) {
      res.status(200).json({ message: response.message, status: 200 });
    } else {
      res.status(404).json({ message: response.message, status: 404 });
    }
  } catch (error) {
    console.error("Error in requestPasswordResetController:", error);
    res.status(500).send("Error requesting password reset");
  }
};

const resetPasswordController = async (req, res) => {
  const { token } = req.query;
  const { newPassword } = req.body;

  // Add checks to ensure the token and newPassword are defined
  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ error: "Token and newPassword are required" });
  }

  try {
    const response = await resetPassword(token, newPassword);
    if (response.success) {
      res.status(200).json({ message: response.message, status: 200 });
    } else {
      res.status(400).json({ message: response.message, status: 400 });
    }
  } catch (error) {
    console.error("Error in resetPasswordController:", error);
    res.status(500).send("Error resetting password");
  }
};

const showTop4PostController = async (req, res) => {
  try {
    const result = await showTop4Post();
    if (result.success) {
      res.status(200).json(result.posts);
    } else {
      res.status(409).json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get Posts");
  }
};

const useLoyaltyPointsController = async (req, res) => {
  const customer_id = req.params.id;
  try {
    const result = await useLoyaltyPoints(customer_id);
    console.log(result);
    if (result.success) {
      res.json({ message: result.message });
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.error("Error in useLoyaltyPointsController:", error);
    res.status(500).send("Error use Loyalty Points");
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
  getPostByIdController,
  showAllPostsController,
  requestPasswordResetController,
  resetPasswordController,
  showLoyaltyPointsController,
  showTop4PostController,
  useLoyaltyPointsController,
};
