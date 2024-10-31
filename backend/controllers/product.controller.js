import Product from "../models/product.model";


export const getProducts =  async (req, res) => {
  
    try{
    
        const products = await Product.find({});
      res.status(200).json({success: true, message: products});
    }
    
    catch(error){
    
        console.error("Error in Getting Products:", error.message);
        res.status(500).json({ success: false, message: "Server Error Occurred" });
        
    
    }
    
    
    }

    export const createProduct = async (req, res) => {
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
      
        
      }


export const updateProduct = async (req, res) => {
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
    
    }
 
    export const deleteProduct = async (req, res) => {
        const { id } = req.params;


        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success:false, message: "Invalid ID"})
        }
    
        try {
          await Product.findByIdAndDelete(id);
          res.status(200).json({ success: true, message: "Successfully deleted" });
        } catch (err) {
          console.log("Couldnt delete product");
      res.status(500).json({success: false, message: 'server error'});
        }
      }
