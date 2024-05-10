import express from 'express';
import {
  createCategory,
  createDiscountType,
  createSizeType,
  deleteCategory,
  deleteDiscountType,
  deleteSizeType,
  fetchCategories,
  fetchDiscountType,
  fetchSizeType
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', fetchCategories);
router.post('/addCategory', createCategory);
router.delete('/deleteCategory/:categoryId', deleteCategory);

router.get('/discountTypes', fetchDiscountType);
router.post('/addDiscountType', createDiscountType);
router.delete('/deleteDiscountType/:discountId', deleteDiscountType);


router.get('/sizeTypes', fetchSizeType);
router.post('/addSizeType', createSizeType);
router.delete('/deleteSizeType/:sizeId', deleteSizeType);

export default router;
