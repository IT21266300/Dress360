import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { sampleProducts, sampleUsers } from '../data'; 
import { ProductModel } from '../models/productModel1'; 
import { UserModel } from '../models/userModel'; 

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    await ProductModel.deleteMany({});
    const createdProducts = await ProductModel.insertMany(sampleProducts);
    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(sampleUsers);
    res.json({ createdProducts, createdUsers });
  })
);

export const seedRouter = router;