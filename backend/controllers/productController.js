import Product from '../models/productModel.js';
import Razorpay from 'razorpay';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  const { productId, amount } = req.body;

  const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const orderOptions = {
    amount: amount * 100,
    currency: 'INR',
    receipt: `order_rcptid_${productId}`,
  };

  try {
    const order = await razorpayInstance.orders.create(orderOptions);
    res.json({ key: process.env.RAZORPAY_KEY_ID, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};