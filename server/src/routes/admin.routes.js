const express=require("express");
const{createUser, getUserById}=require("../services/admin.services");
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

  
  adminRoutes.get("/getUser/:id",async (req, res) => {
    const user_id= parseInt(req.params.id, 10);
    console.log(user_id);
    try {
      const result = await getUserById(user_id);
      
      if (result.success) {
        return res.status(200).json({ user: result.user });
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (err) {
      console.log('Fail to get user', err);
      res.status(500).json({ message: 'Error getting user' });
    }


  }

  );
  



  module.exports = adminRoutes;


