import express from 'express';
import { createProduct, getProducts } from '../controllers/productController.js';
const router = express.Router();

router.post('/addProduct', createProduct);
router.get('/getProducts', getProducts);



export default router;
