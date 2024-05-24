const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

//api user
const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

//api show product
const productRoutes=require("./routes/showProduct");
app.use("/api/product",productRoutes);



app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
module.exports = app;
