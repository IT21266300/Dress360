import express from 'express';
import {
  calculateTotalRating,
  calculateTotalStock,
  createProduct,
  deleteProduct,
  getAllImages,
  getCategories,
  getImage,
  getProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
} from '../controllers/productController.js';

const router = express.Router();

router.post('/addProduct', createProduct);
router.post('/uploadImage', uploadImage);
router.get('/getProducts', getProducts);
router.get('/getProduct/:productId', getSingleProduct);
router.get('/getCategories', getCategories);
router.delete('/deleteProduct/:productId', deleteProduct);
router.put('/updateProduct/:productId', updateProduct);
router.get('/totalRatings/:productId', calculateTotalRating);
router.get('/totalStocks/:productId', calculateTotalStock);
router.get('/getImages', getAllImages);
router.get('/getImage/:imgId', getImage);

export default router;
