const express = require("express");
const {
  createUser,
  getUserById,
  getAllUser,
  DeleteUser,
  updateUser,
} = require("../services/admin.services");
const adminRoutes = express.Router();

// admin CRUD api

//api create User
adminRoutes.post("/create", async (req, res) => {
  const { username, password, email, role_id } = req.body;
  console.log(req.body);
  try {
    const result = await createUser(username, password, email, role_id);
    console.log(result);
    if (result.success) {
      return res.status(200).json({
        message: "Create successful",
        message: result.message,
        status: 200,
      });
    } else {
      return res.status(401).json({
        message: "Invalid userName,password,email,roleId",
        status: 401,
      });
    }
  } catch (err) {
    console.log("fail to create a user");
  }
});

//api get User
adminRoutes.get("/getUser/:id", async (req, res) => {
  const user_id = parseInt(req.params.id, 10);
  console.log(user_id);
  try {
    const result = await getUserById(user_id);

    if (result.success) {
      return res.status(200).json({ user: result.user });
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (err) {
    console.log("Fail to get user", err);
    res.status(500).json({ message: "Error getting user" });
  }
});

// get All User
adminRoutes.get("/allUsers", async (req, res) => {
  try {
    const result = await getAllUser();

    if (result.success) {
      return res.status(200).json({ user: result.user });
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get all user", error);
    res.status(500).json({ message: "Error getting all user" });
  }
});

// Delete user

adminRoutes.get("/delete/:id", async (req, res) => {
  const user_id = parseInt(req.params.id, 10);
  console.log(user_id);
  try {
    const result = await DeleteUser(user_id);
    console.log(result);
    if (result.success) {
      return res
        .status(200)
        .json({ message: "Delete successful", status: 200 });
    } else {
      return res.status(401).json({ message: "Delete failed", status: 401 });
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
});

//api update User
adminRoutes.put("/update/:id", async (req, res) => {
  const user_id = parseInt(req.params.id, 10);
  const { username, password, email, role_id } = req.body;
  console.log(req.body);
  try {
    const result = await updateUser(user_id, username, password, email, role_id);
    console.log(result);
    if (result.success) {
      return res.status(200).json({
        message: "Update successful",
        message: result.message,
        status: 200,
      });
    } else {
      return res.status(401).json({
        message: "Invalid username, password, email, roleId",
        status: 401,
      });
    }
  } catch (err) {
    console.log("fail to update 1");
  }
});


module.exports = adminRoutes;
