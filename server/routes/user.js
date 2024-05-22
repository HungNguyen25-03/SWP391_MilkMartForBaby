const express = require('express');  
const router = express.Router();  


const {loginUser}=require('../models/userModels');  

router.post('/login',async (req,res)=>{
    const { email, password } = req.body;
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        res.status(200).json({ message: 'Login successful', user: result.user });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (err) {
      res.status(500).send('Error logging in user');
    }
});


module.exports = router; 