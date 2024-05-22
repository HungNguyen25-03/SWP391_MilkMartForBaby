const express=require('express');
const path=require('path');


const app=express();

const  userRoutes = require("./routes/user");  

app.use("/api/user", userRoutes);  


app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
module.exports=app;