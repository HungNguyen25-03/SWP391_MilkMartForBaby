const express = require("express");
const router = express.Router();

const { getAllProduct } = require("../models/productModels");

router.get("/getProduct", async (req, res) => {
   try {
    const result = await getAllProduct();
    if (result.success) {
        res.json(result.product); 
    } else {
        res.json({ message: result.message }); 
    }
   } catch (error) {
    console.log("Faillll");
   }
}
);

module.exports = router;