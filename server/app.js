const express = require("express");
const path = require("path");

const app = express();

const userRoutes = require("./routes/user");
app.use(express.json());

app.use("/api/user", userRoutes);

app.listen(4000, () => {
  console.log("Server is running on port 3000");
});
module.exports = app;
