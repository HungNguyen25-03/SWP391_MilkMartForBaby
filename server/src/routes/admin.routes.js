const express=require("express");
const{createUser}=require("../services/admin.services");
const adminRoutes=express.Router();


// admin CRUD api

adminRoutes.post("/create", async (req, res) => {
  const { username, password, email, role_id } = req.body;
  console.log(req.body);
    try {
      const result = await createUser(username,password,email,role_id);
     console.log(result);
      if (result.success) {
        return res
          .status(200)
          .json({ message: "Create successful",  message:result.message, status: 200 });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid userName,password,email,roleId", status: 401 });
      }
    } catch (err) {
      console.log("fail to create 1");
    }
  });

  module.exports = adminRoutes;


