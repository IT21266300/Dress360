import express from 'express';
import {
  createCategory,
  deleteCategory,
  fetchCategories
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', fetchCategories);
router.post('/addCategory', createCategory);
router.delete('/deleteCategory/:categoryId', deleteCategory);

export default router;
