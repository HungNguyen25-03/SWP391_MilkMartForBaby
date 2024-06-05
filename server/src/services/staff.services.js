const { poolPromise } = require('./database.services');

async function createVoucher(discount, expirationDate) {
    try {
        const code = await createUniqueVoucherCode(8);
        const pool = await poolPromise;
        await pool.request()
            .input('code', code) // Bind the `code` parameter
            .input('discount', discount)
            .input('expiration_date', expirationDate)
            .query('INSERT INTO Vouchers (code, discount, expiration_date) VALUES (@code, @discount, @expiration_date)');
        return { code, discount, expirationDate };
    } catch (error) {
        throw error;
    }
}

function generateVoucherCode(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

async function voucherCodeExists(code) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('code', code)
            .query('SELECT COUNT(*) AS count FROM Vouchers WHERE code = @code');
        return result.recordset[0].count > 0;
    } catch (error) {
        throw error;
    }
}

async function createUniqueVoucherCode(length) {
    let code = generateVoucherCode(length);
    let exists = await voucherCodeExists(voucherId);
    while (exists) {
        code = generateVoucherCode(length);
        exists = await voucherCodeExists(code);
    }
    return code;
}

module.exports = {
    createVoucher,
}

