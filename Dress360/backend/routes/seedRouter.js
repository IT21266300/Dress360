// seedRouter.js

import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { sampleProducts, sampleUsers } from '../data.js'; // Assuming data.js is also converted
import Product from '../models/productModel.js'; // Assuming productModel.js is converted
import User from '../models/userModel.js'; // Assuming userModel.js is converted

const seedRouter = Router();

seedRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    await Product.deleteMany({}); // Delete all existing products
    const createdProducts = await Product.insertMany(sampleProducts); // Insert sample products

    await User.deleteMany({}); // Delete all existing users
    const createdUsers = await User.insertMany(sampleUsers); // Insert sample users

    res.json({ createdProducts, createdUsers });
  })
);

export default seedRouter; 