const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/users.routes");
const productRoutes = require("./routes/products.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");
const { errorHandlingMiddleware } = require("./middlewares/error.middleware");
//api user

app.use("/user", userRoutes);

//api show product
app.use("/product", productRoutes);

// api show order
app.use("/order", orderRoutes);

//api to use admin
app.use("/admin", adminRoutes);

app.use(errorHandlingMiddleware);

app.listen(4000, () => {
  console.log(`Server running at http://localhost:4000/`);
  console.log("Server is running on port 4000");
});

module.exports = app;
