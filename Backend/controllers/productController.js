import expressAsyncHandler from 'express-async-handler';
import Product from "../models/productModel";


// Add a new product
export const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});