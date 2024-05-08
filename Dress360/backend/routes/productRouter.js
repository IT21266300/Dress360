// productRouter.js

import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js'; // Assuming productModel.js is converted

const productRouter = Router();

// Get all products
productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({}); 
    res.json(products);
  })
);

// Get all product categories
productRouter.get(
  '/categories',
  asyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.json(categories);
  })
);

// Get product by slug
productRouter.get(
  '/slug/:slug',
  asyncHandler(async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  })
);

export default productRouter;