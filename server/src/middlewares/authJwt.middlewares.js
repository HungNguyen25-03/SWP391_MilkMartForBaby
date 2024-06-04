const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { poolPromise, sql } = require("../services/database.services");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = async (req, res, next) => {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("user_id", sql.Int, req.userId)
        .query(`SELECT role_id FROM Users WHERE user_id = @user_id`);
    const user = result.recordset[0];
    if (user.role_id === 1) {
        next();
        return;
    }
    return res.status(403).send({ message: "Require Admin Role!" });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
};
module.exports = authJwt;