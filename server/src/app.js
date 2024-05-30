const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/users.routes");
const productRoutes = require("./routes/products.routes");

//api user
app.use("/user", userRoutes);

//api show product
app.use("/product", productRoutes);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
module.exports = app;
