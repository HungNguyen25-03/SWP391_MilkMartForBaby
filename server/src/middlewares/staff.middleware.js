const { poolPromise } = require('../services/database.services');

const createVoucherMiddleware = async (req, res, next) => {
    try {
        const errors = [];
        const { discount, expiration_date } = req.body;

        if (!discount) {
            errors.push({
                name: "discount",
                success: false,
                message: "Discount is required",
                status: 400
            });
        }

        if (discount < 0.0 || discount > 75.0) {
            errors.push({
                name: "discount",
                success: false,
                message: "Discount must be between 0 and 75",
                status: 400
            });
        }

        if (!expiration_date) {
            errors.push({
                name: "expiration_date",
                success: false,
                message: "Voucher expiry date is required",
                status: 400
            });
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const pool = await poolPromise;
        req.pool = pool;
        next();
    } catch (error) {
        res.status(500).send("Error creating voucher");
    }
}

module.exports = {
    createVoucherMiddleware,
}