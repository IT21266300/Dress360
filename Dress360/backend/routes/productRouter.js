import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { ProductModel } from '../models/productModel1'; // Assuming productModel.js is converted

const router = Router();

// Get all products
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.json(products);
  })
);

// Get all product categories
router.get(
  '/categories',
  asyncHandler(async (req, res) => {
    const categories = await ProductModel.find().distinct('category');
    res.json(categories);
  })
);

// Get product by slug
router.get(
  '/slug/:slug',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  })
);

export const productRouter = router;