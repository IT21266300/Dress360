// src/routes/3DModelRouter.ts

import express from 'express';
import asyncHandler from 'express-async-handler';
import { ThreeDModelModel } from '../models/3Dmodel';

const router = express.Router();

// GET /api/models
router.get(
  '/tryon',
  asyncHandler(async (req, res) => {
    const models = await ThreeDModelModel.find();
    res.json(models);
  })
);

// Add more routes as needed, such as fetching a specific model

export default router;
