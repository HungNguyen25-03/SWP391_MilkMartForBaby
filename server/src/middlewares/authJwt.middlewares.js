const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { poolPromise, sql } = require("../services/database.services");

const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    
    if (!token) {
        return res.status(403).send({
        message: "No token provided!",
        });
    }
    
    jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
        return res.status(401).send({
            message: "Unauthorized!",
        });
        }
    
        req.userId = decoded.id;
        next();
    });
}

module.exports = {
    verifyToken,
}