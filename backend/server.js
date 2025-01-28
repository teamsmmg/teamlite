import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productRoute.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI_PRODUCT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'));

app.use('/api/products', productRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));