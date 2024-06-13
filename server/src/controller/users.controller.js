const {
  registerUser,
  loginUser,
  applyVoucher,
  showAllVoucher,
  getVoucherByUserId,
  claimVoucher,
} = require("../services/users.services");

const authJwt = require("../middlewares/authJwt.middlewares");

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
      res.status(200).json({ message: voucher.message, status: 200 });
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
    res.status(500).send("Error showing all vouchers");
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
  console.log("token:", token);

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("token", sql.VarChar, token)
      .query(`SELECT * FROM RefreshTokens WHERE token = @token`);

    const storedToken = result.recordset[0];
    if (!storedToken) return res.sendStatus(403);

    jwt.verify(token, refreshSecretKey, (err, user) => {
      if (err) return res.sendStatus(403);

      const newAccessToken = jwt.sign({ userId: user.userId }, secretKey, {
        expiresIn: "1h",
      });
      res.json({
        accessToken: newAccessToken,
      });

      // for testing purposes

      // const newAccessToken = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: "1m" });
      // res.json({
      //   accessToken: newAccessToken
      // });
    });
  } catch (error) {
    console.error("Error in refreshTokenController:", error);
    res.status(500).send("Internal Server Error");
  }
};

const logoutController = async (req, res) => {
  const { token } = req.body;
  await authJwt.removeRefreshToken(token);
  res.sendStatus(204).send("Logged out successfully");
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
};
