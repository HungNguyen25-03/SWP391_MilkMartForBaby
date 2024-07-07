const sql = require("mssql");
require("dotenv").config();

const sqlConfig = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  port: parseInt(process.env.SQL_PORT),
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
  },
};

const poolPromise = new sql.ConnectionPool(sqlConfig)
  .connect()
  .then((pool) => {
    console.log("Connected to the database.");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed: ", err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise,
};
