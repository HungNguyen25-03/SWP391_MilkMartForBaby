const {createVoucher} = require('../services/staff.services');

const createVoucherController = async (req, res) => {
    const { discount, expiration_date } = req.body;

    try {
        const voucher = await createVoucher(discount, expiration_date);
        console.log(voucher);
        if (voucher.success) {
            res.status(200).json({ message: voucher.message, status: 200 });
        }
    } catch (error) {
        res.status(500).send("Error creating voucher");
    }
}

module.exports = {
    createVoucherController,
}