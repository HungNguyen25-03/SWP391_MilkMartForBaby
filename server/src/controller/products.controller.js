const { getAllProduct } = require("../services/products.services");

const getProduct = async (req, res) => {
  try {
    const result = await getAllProduct();
    if (result.success) {
      res.json(result.product);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Faill");
  }
};

const {getProductById}=require("../services/products.services");

const getProById=async (req,res)=>{
  try{
    const result =await getProById();
    if(result.success){
      res.json(result.product);

    }else{
      res.json({message:result.message});
    }

  }catch(error){
    console.log("Fail to get Product by ID");
  }
 
}

module.exports = {
  getProduct,
  getProById
};
