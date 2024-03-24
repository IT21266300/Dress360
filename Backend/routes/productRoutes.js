import express from 'express';
import {
    calculateTotalRating,
  calculateTotalStock,
  createProduct,
  deleteProduct,
  getCategories,
  getProducts,
  getSingleProduct,
  updateProduct,
} from '../controllers/productController.js';
const router = express.Router();

router.post('/addProduct', createProduct);
router.get('/getProducts', getProducts);
router.get('/getProduct/:productId', getSingleProduct);
router.get('/getCategories', getCategories);
router.delete('/deleteProduct/:productId', deleteProduct);
router.put('/updateProduct/:productId', updateProduct);
router.get('/totalRatings/:productId', calculateTotalRating);
router.get('/totalStocks/:productId', calculateTotalStock);



export default router;
