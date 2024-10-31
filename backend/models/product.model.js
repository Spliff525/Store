import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timeStamp: true, //created at / updated at timeStamp
  }
);
const Product = mongoose.model("Product", productSchema);
//products
export default Product;
