const express = require("express");
const path = require("path");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

//api user
const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

//api show product
const productRoutes = require("./routes/showProduct");
app.use("/api/product", productRoutes);

//api register
const registerRoutes = require("./routes/register");
app.use("/api/register", registerRoutes);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
module.exports = app;
