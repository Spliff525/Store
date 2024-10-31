import express from "express";
import dotenv from "dotenv";
import Product from "./models/product.model.js";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image || !product.image) {
    return res
      .status(404)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Creating a Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }

  
});

app.get("/api/products", async (req, res) => {

try{

    const products = await Product.find({});
  res.status(200).json({success: true, message: products});
}

catch(error){

    console.error("Error in Getting Products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
    

}


})


app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Successfully deleted" });
    } catch (err) {
      console.log("Couldnt delete product");
  res.status(500).json({success: false, message: 'Product not found'});
    }
  });



app.put("/api/products/:id", async (req, res) => {
const {id} = req.params;
const product = req.body;

if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success:false, message: "Invalid ID"})
}

try{
const updatedProduct = await Product.findByIdAndUpdate(id, product,{new:true} )

res.status(200).json({success:true, message:updatedProduct})

}
catch(err) {

    res.status(500).json({success:false, message:"server error"})

}

}) 
console.log(process.env.MONGO_URI);
app.listen(5000, () => {
  connectDB();
  console.log("Server is running on port 5000 hello world");
  
});
