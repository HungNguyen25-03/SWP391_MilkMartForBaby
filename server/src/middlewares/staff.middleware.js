const createVoucherMiddleware = async (req, res, next) => {
  try {
    const errors = [];
    const { discount, expiration_date } = req.body;

    if (!discount) {
      errors.push({
        name: "discount",
        success: false,
        message: "Discount is required",
        status: 400,
      });
    }

    if (discount < 0 || discount > 75) {
      errors.push({
        name: "discount",
        success: false,
        message: "Discount must be between 0 and 75",
        status: 400,
      });
    }
    const checkDate = new Date(expiration_date);
    if (!checkDate) {
      errors.push({
        name: "expiration_date",
        success: false,
        message: "Voucher expiry date is required",
        status: 400,
      });
    }

    if (checkDate <= new Date()) {
      errors.push({
        name: "expiration_date",
        success: false,
        message: "Voucher expiry date must be in the future",
        status: 400,
      });
    }

    if (errors.length > 0) {
      return next(errors);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVoucherMiddleware,
};
