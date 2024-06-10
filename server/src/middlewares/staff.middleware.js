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

const editVoucherMiddleware = async (req, res, next) => {
  try {
    const errors = [];
    const { discount, expiration_date } = req.body;

    if (discount === undefined || discount === null) {
      errors.push({
        name: "discount",
        success: false,
        message: "Discount is required",
        status: 400,
      });
    } else if (discount < 0 || discount > 75) {
      errors.push({
        name: "discount",
        success: false,
        message: "Discount must be between 0 and 75",
        status: 400,
      });
    }

    if (!expiration_date) {
      errors.push({
        name: "expiration_date",
        success: false,
        message: "Voucher expiry date is required",
        status: 400,
      });
    } else {
      const checkDate = new Date(expiration_date);
      if (isNaN(checkDate.getTime())) {
        errors.push({
          name: "expiration_date",
          success: false,
          message: "Invalid expiration date format",
          status: 400,
        });
      } else if (checkDate <= new Date()) {
        errors.push({
          name: "expiration_date",
          success: false,
          message: "Voucher expiry date must be in the future",
          status: 400,
        });
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  } catch (error) {
    console.error("Error in editVoucherMiddleware:", error);  
    next(error);
  }
};



module.exports = {
  createVoucherMiddleware,
  editVoucherMiddleware,
};
