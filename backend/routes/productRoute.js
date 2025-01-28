import express from 'express';
import { getProducts, createOrder } from '../controllers/productController.js';
const router = express.Router();

router.get('/', getProducts);
router.post('/pay', createOrder);

export default router;