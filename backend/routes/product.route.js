import express from 'express';
import { createProduct } from '../controllers/product.controller.js';
import { updateProduct } from '../controllers/product.controller.js';
import { getProducts } from '../controllers/product.controller.js';
import { deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();
router.post("/", createProduct);
router.get("/", getProducts); 
router.delete("/", deleteProduct, );
router.put("/", updateProduct ) 

export default router; 